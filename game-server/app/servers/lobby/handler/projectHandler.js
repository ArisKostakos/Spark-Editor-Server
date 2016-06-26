var fs = require('fs-extra');
var path = require('path');
var database = require('../../../modules/database');
var deepPopulate = require('mongoose-deep-populate');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.listUserProjects = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var user = session.get('user');
    var developer = session.get('developer');

    console.warn("The Fullname of the connected user is: " + user.firstName + ' ' + user.lastName);
    console.warn("The connected developer id is: " + developer._id);

    //Find Projects
    database.find(database.Project, {owner:developer._id},
        function (err, objects_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", projects: objects_found});
        }
    );
};

handler.deleteProject = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var user = session.get('user');
    var developer = session.get('developer');


    //Find Projects
    database.findOne(database.Project, {_id: msg.projectId, owner: developer._id},
        function (err, project_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            var projectName = project_found.name;

            //Remove it
            project_found.remove();

            //Find Project Assets
            database.find(database.Asset, {owner: developer._id, 'tags.0': projectName},
                function (err, assets_found) {
                    //Handle Error
                    if (err) {
                        next(null, {code: "error"});
                        return console.error(err);
                    }

                    //Remove them
                    for (var i=0; i<assets_found.length; i++)
                        assets_found[i].remove();

                    //Should also remove modules, actual files, etc, etc...

                    //Handle Success
                    next(null, {code: "success"});
                }
            );
        }
    );
};

handler.fork = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var projectName = msg.projectName;
    var projectTitle = msg.projectTitle;
    var forkedProjectName = msg.forkedProjectName;
    var user = session.get('user');
    var developer = session.get('developer');


    //get forked Project

    //get user spark
    database.findOne(database.User, {name: 'spark'},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (object_found) {
                var sparkDeveloperId = object_found.developerReference;

                //Get Template
                database.findOneAndPopulate(database.Project, {name: forkedProjectName, owner: sparkDeveloperId}, "modules",
                    function (err, object_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        if (object_found) {
                            var templateProject = object_found;

                            //Fork ALL modules of template Project
                            console.warn("Creating Modules for forked project...");
                            forkModules(self, msg, session, templateProject, projectName, 0, [], function(err, modulesCreated) {
                                //Handle Error
                                if (err) {
                                    next(null, {code: "error"});
                                    return console.error(err);
                                }

                                //Handle Success

                                //create new project (mark it forks ForkedProject, not a template, copy paste some ForkedProject stuff)
                                var raw_Project = {name: projectName, version: '0.0.1', title: projectTitle, owner: developer._id, fork: templateProject._id, modules: modulesCreated, moduleMain: templateProject.moduleMain, tags: ['project'], includes: templateProject.includes, libraryCollections: templateProject.libraryCollections, accessControl: []};

                                //Create Project
                                database.create(database.Project, raw_Project,
                                    function (err, objCreated_Project) {
                                        //Handle Error
                                        if (err) {
                                            next(null, {code: "error"});
                                            return console.error(err);
                                        }

                                        //Handle Success

                                        //Create directories
                                        createProjectDirectories(objCreated_Project.name, user.name);

                                        console.warn("Success creating project! Here it is: ");
                                        console.warn(objCreated_Project);

                                        //success
                                        next(null, {code: "success"});
                                    }
                                );
                            });
                        }
                        else {
                            next(null, {code: "error"});    //notfound
                        }
                    }
                );
            }
            else {
                next(null, {code: "error"});    //notfound
            }
        }
    );
}

//Forks all modules of given project. (other conversion info is inside msg and session :/). Returns modulesCreated array
function forkModules(self, msg, session, forkedProject, newProjectName, index, modulesCreated, cb)
{
    if (index<forkedProject.modules.length)
    {
        var forkedModule = forkedProject.modules[index];
        console.warn("Found Module: " + forkedModule.name);

        //Fork it
        forkModule(self, msg, session, forkedModule, newProjectName, function (err, moduleCreated){
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success

            //Push Module to Collection
            modulesCreated.push(moduleCreated);

            //Next
            forkModules(self, msg, session, forkedProject, newProjectName, index+1, modulesCreated, cb);
        });
    }
    else //All done.. exiting, issuing real callback
    {
        cb(null, modulesCreated);
    }
}

//Forks a given module (other conversion info is inside msg and session :/) Returns moduleCreated
function forkModule(self, msg, session, forkedModule, newProjectName, cb)
{
    console.warn("Forking Module: " + forkedModule.name);

    //Create New Module
    createModule(self, session, forkedModule.name, forkedModule.requires, [newProjectName], session.get('developer')._id, forkedModule._id, function (err, moduleCreated) {
        //Handle Error
        if (err) {
            cb(err);
            return;
        }

        //Handle Success

        //Populate assets of forked Module
        forkedModule.deepPopulate('assets assets.owner assets.owner.user assets.assetDependancies', function (err, forkedModule){
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success
            forkAssets(self, msg, session, forkedModule.assets, 0, moduleCreated, function (err){
                //Handle Error
                if (err) {
                    cb(err);
                    return;
                }

                //Handle Success (update dependancies)
                forkAssetDependancies(self, msg, session, forkedModule.assets,0, function (err) {
                    //Handle Error
                    if (err) {
                        cb(err);
                        return;
                    }

                    //Handle Success
                    cb(null, moduleCreated);
                });
            });
        });
    });
}

function createModule(self, session, moduleName, moduleRequires, moduleTags, moduleOwnerId, forkedModuleId, cb)
{
    //Create Main Module for this project
    self.app.rpc.assets.createRemote.createModule(session, moduleName, moduleRequires, moduleTags, moduleOwnerId, forkedModuleId, function(err, module_created) {
        //Handle Error
        if (err) {
            cb(err);
            return;
        }

        //Handle Success
        //Re-get Module. The one I get from rpc apparently is not a proper Mongoose document and lacks .save().. I don't know.... :/
        database.findOne(database.Module, {_id: module_created._id},
            function (err, module_found) {
                //Handle Error
                if (err) {
                    cb(err);
                    return;
                }

                //Handle Success
                cb(null, module_found);
            }
        );
    });
}

function forkAssets(self, msg, session, assets, index, moduleContainer, cb) {
    if (index<assets.length)
    {
        //put user into channel
        self.app.rpc.assets.createRemote.copy(session, assets[index], msg.forkedProjectName, session.get('user'), session.get('developer'), msg.projectName, function(err, asset_created){
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Add Reference to Module
            moduleContainer.assets.push(asset_created._id);

            //Next
            forkAssets(self, msg, session, assets, index+1, moduleContainer, cb);
        });
    }
    else
    {
        moduleContainer.markModified('assets');

        moduleContainer.save(function (err) {
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Success
            cb(null);
        });
    }
}

function forkAssetDependancies(self, msg, session, assets, index, cb) {
    if (index<assets.length)
    {
        var asset = assets[index];

        //query forked asset
        console.warn('1: owner: ' + session.get('developer')._id + ', type: ' + asset.type + ', name: ' + asset.name);
        database.findOne(database.Asset, {owner: session.get('developer')._id, type: asset.type, name: asset.name.replace(msg.forkedProjectName,msg.projectName)},
            function (err, object_found) {
                //Handle Error
                if (err) {cb(err); return;}

                //Handle Success
                if (object_found) {

                    //for each dependancy
                    forkAssetDependanciesDeep(self, msg, session, object_found, asset.assetDependancies,0,
                        function (err) {
                            //Handle Error
                            if (err) {cb(err); return;}

                            //Next
                            forkAssetDependancies(self, msg, session, assets, index+1, cb);
                        }
                    );
                }
                else {
                    cb("asset not found");
                    return;
                }
            }
        );
    }
    else
    {
        cb(null);
    }
}

function forkAssetDependanciesDeep(self, msg, session, forkedAsset, assetDependancies, index, cb) {
    if (index < assetDependancies.length) {
        var assetDependancy = assetDependancies[index];

        //query forked dependancy
        console.warn('2: owner: ' + session.get('developer')._id + ', type: ' + assetDependancy.type + ', name: ' + assetDependancy.name);
        database.findOne(database.Asset, {owner: session.get('developer')._id, type: assetDependancy.type, name: assetDependancy.name.replace(msg.forkedProjectName,msg.projectName)},
            function (err, object_found) {
                //Handle Error
                if (err) {cb(err); return;}

                //Handle Success
                var dependancyToAdd;

                if (object_found)
                    dependancyToAdd = object_found;
                else
                    dependancyToAdd = assetDependancy;

                //add to dependancies
                forkedAsset.assetDependancies.push(dependancyToAdd._id);

                //Next
                forkAssetDependanciesDeep(self, msg, session, forkedAsset, assetDependancies, index+1, cb);
            }
        );
    }
    else
    {
        forkedAsset.markModified('assetDependancies');
        forkedAsset.save(function (err) {
            //Handle Error
            if (err) {cb(err); return;}

            //Success
            cb(null);
        });
    }
}

handler.create = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var projectName = msg.projectName;
    var tags = msg.tags;
    var user = session.get('user');
    var developer = session.get('developer');

    console.warn("The Fullname of the connected user is: " + user.firstName + ' ' + user.lastName);
    console.warn("The projectName is: " + projectName);
   // console.warn("The projectTitle is: " + projectTitle);


    //Does A project with that name already exist for this developer?
    database.findOne(database.Project, {name: projectName, owner: developer._id},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (object_found)
                next(null, {code: "exists"});
            else
            {
                var raw_Project = {name: projectName, version: '0.0.1', title: projectName, owner: developer._id, modules: [], tags: tags, includes: [], libraryCollections: [], accessControl: []};

                //Create Project
                database.create(database.Project, raw_Project,
                    function (err, objCreated_Project) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success

                        //Create directories
                        createProjectDirectories(objCreated_Project.name, user.name);

                        next(null, {code: "success", project: objCreated_Project});
                    }
                );
            }
        }
    );
};

//Get all library collections referenced in this project
handler.getProjectLibraryCollections = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    database.findOneAndDeepPopulate(database.Project, {_id: project._id}, "libraryCollections libraryCollections.baseClass",
        function (err, project_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", libraryCollections: project_found.libraryCollections});
        }
    );
};

//Get all modules referenced in this project
handler.getProjectModulesPopulated = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    database.findOneAndDeepPopulate(database.Project, {_id: project._id}, "modules modules.assets", //no owner stuff.. good..
        function (err, project_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", modules: project_found.modules});
        }
    );
};

//Save Project
handler.saveProject = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    var saveCommands = msg.commands;

    console.warn("Saving Project...");
    proccessCommands(self, msg, session, saveCommands, 0, function(err) {
        //Handle Error
        if (err) {
            next(null, {code: "error"});
            return console.error(err);
        }

        //Handle Success
        next(null, {code: "success"});
    });
};

/* SAVE FUNCTIONS...
    MAYBE ADD US IN A BRAND NEW SAVE SERVER, AND MAKE ALL OF US REMOTES! */
function proccessCommands(self, msg, session, saveCommands, index, cb)
{
    if (index<saveCommands.length)
    {
        var saveCommand = saveCommands[index];

        //Proccess Command
        proccessCommand(self, msg, session, saveCommand, function (err){
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success

            //Next Command
            proccessCommands(self, msg, session, saveCommands, index+1, cb);
        });
    }
    else //All done.. exiting, issuing real callback
    {
        cb(null);
    }
}

function proccessCommand(self, msg, session, command, cb)
{
    switch(command.type) {
        case 'createAsset':
            save_createAsset(self, msg, session, command, cb);
            break;
        case 'updateAsset':
            save_updateAsset(self, msg, session, command, cb);
            break;
        case 'addAssetToModule':
            save_addAssetToModule(self, msg, session, command, cb);
            break;
        case 'createModule':
            save_createModule(self, msg, session, command, cb);
            break;
        case 'addModuleToProject':
            save_addModuleToProject(self, msg, session, command, cb);
            break;
        default:
            console.error("Unknown Save Command Type! Ignoring...");
            cb(null);
    }
}

function save_createAsset(self, msg, session, command, cb)
{
    console.log("Proccessing [createAsset] Command", command);

    /*
     Create new DBA
     --------------
     type: "createAsset"
     asset: DBA
     */

    //So, here's what's happening here... File is already uploaded..
    //Recreate the asset and move the file and stuff
    createAsset(command.asset, session, function (err) {
        //Handle Error
        if (err) {
            cb(err);
            return;
        }

        //Handle Success
        cb(null);
    });
}

//Put me in assets server and make me remote
function createAsset (asset, session, cb)
{
    copyUploadedAsset(asset, session, function(err) {
        //Handle Error
        if (err) {
            cb(err);
            return;
        }

        //Handle Success
        var raw_Asset = {name: asset.name, owner: asset.owner, type: asset.type, dir: asset.dir, fileName: asset.fileName, fileExtension: asset.fileExtension, title: asset.title, fileSize: asset.fileSize, componentType: asset.componentType, tags: asset.tags, meta: asset.meta, accessControl: [], assetDependancies: []};

        //Create Asset
        database.create(database.Asset, raw_Asset,
            function (err, objCreated_Asset) {
                //Handle Error
                if (err) {
                    cb(err);
                    return;
                }

                //Send Success Signal
                cb(null);
            }
        );
    });
}

//Put me in assets server and make me remote
function copyUploadedAsset (asset, session, cb)
{
    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    //Asset Path
    var assetPath = path.resolve("../web-server/public") + '/assets';

    //User Path
    var userPath = assetPath + '/' + user.name;

    var fullName = asset.fileName + '.' + asset.fileExtension;

    //Asset Source Path
    var assetSource = userPath + '/incoming/' + fullName;

    //Asset User Path (ASSUMES THE OWNER IS NOT A TEAM BUT A USER! WARNING!)
    var assetUserPath = assetPath + '/' + asset.owner.user.name;
    console.warn('asset user path: ' + assetUserPath);

    //Asset Target Path
    fs.ensureDirSync(assetUserPath + '/' + asset.type + '/' + asset.dir);
    var assetTarget = assetUserPath + '/' + asset.type + '/' + asset.dir + '/' + fullName;


    //Move Asset File
    fs.move(assetSource, assetTarget, {clobber:true},
        function(err) {
            if (err) {
                cb(err);
                return;
            }

            //Send Success Signal
            cb(null);
        }
    );
}

function save_updateAsset(self, msg, session, command, cb)
{
    console.log("Proccessing [updateAsset] Command", command);

    /*
     Update DBA
     ----------
     type: "updateAsset"
     uploadsFile: true/false  //IF THIS IS TRUE, it ignores the field value and just updates the file instead
     asset: DBA //ONLY used temporarily for uploadsFile==TRUE. bit of a hack.. see below for more info |||| NOT PASSED HERE(server)
     assetName: String
     assetOwnerId: ObjectId
     assetType: String
     field: String
     newValue: Object
     */

    //Find Asset to Update
    database.findOneAndDeepPopulate(database.Asset, {owner: command.assetOwnerId, type: command.assetType, name: command.assetName}, "owner.user",
        function (err, asset_found) {
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success

            //If this update is to update its File
            if (command.uploadsFile==true)
            {
                copyUploadedAsset(asset_found, session, function (err) {
                    //Handle Error
                    if (err) {
                        cb(err);
                        return;
                    }

                    //Handle Success
                    cb(null);
                });
            }
            //If this update is to update a field of the DB object
            else
            {
                console.warn("Not Implemented yet.. but its very extremely easy to do");
                //update field (with reflect)

                //save field(with reflect)

                cb(null);
            }
        }
    );
}

function save_addAssetToModule(self, msg, session, command, cb)
{
    console.log("Proccessing [addAssetToModule] Command", command);

    /*
     Add DBA to Module
     -----------------
     type: "addAssetToModule"

     assetName: String
     assetOwnerId: ObjectId
     assetType: String

     moduleName: String
     moduleOwnerId: ObjectId
     moduleProjectName: String
     */

    //Find Asset to Add
    database.findOne(database.Asset, {owner: command.assetOwnerId, type: command.assetType, name: command.assetName},
        function (err, asset_found) {
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success

            //Find Module to add it to
            database.findOne(database.Module, {owner: command.moduleOwnerId, 'tags.0': command.moduleProjectName, name: command.moduleName},
                function (err, module_found) {
                    //Handle Error
                    if (err) {
                        cb(err);
                        return;
                    }

                    //Handle Success

                    //Add it
                    module_found.assets.push(asset_found._id);

                    module_found.markModified('assets');
                    module_found.save(function (err) {
                        //Handle Error
                        if (err) {
                            cb(err);
                            return;
                        }

                        //Handle Success
                        cb(null);
                    });
                }
            );
        }
    );
}


function save_createModule(self, msg, session, command, cb)
{
    console.log("Proccessing [createModule] Command", command);

    /*
     Create new Module DBO
     ----------------------
     type: "createModule"
     uploadsFile: false
     module: ModuleDBO
     */

    //Recreate the module
    _createModule(command.module, session, function (err) {
        //Handle Error
        if (err) {
            cb(err);
            return;
        }

        //Handle Success
        cb(null);
    });
}



//Put me in ... server and make me remote
function _createModule (module, session, cb)
{
    var raw_Module = {name: module.name, owner: module.owner, requires: module.requires, assets: [], tags: module.tags};

    //Create Module
    database.create(database.Module, raw_Module,
        function (err, objCreated_Module) {
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Send Success Signal
            cb(null);
        }
    );
}

function save_addModuleToProject(self, msg, session, command, cb)
{
    console.log("Proccessing [addModuleToProject] Command", command);

    /*
     Add Module DBO to Project
     -------------------------
     type: "addModuleToProject"
     uploadsFile: false
     moduleName: String
     moduleOwnerId: ObjectId
     moduleProjectName: String
     projectName: String
     projectOwnerId: ObjectId
     */

    //Find Module to Add
    database.findOne(database.Module, {owner: command.moduleOwnerId, 'tags.0': command.moduleProjectName, name: command.moduleName},
        function (err, module_found) {
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Handle Success

            //Find Project to add it to
            database.findOne(database.Project, {owner: command.projectOwnerId, name: command.projectName},
                function (err, project_found) {
                    //Handle Error
                    if (err) {
                        cb(err);
                        return;
                    }

                    //Handle Success

                    //Add it
                    project_found.modules.push(module_found._id);

                    project_found.markModified('modules');
                    project_found.save(function (err) {
                        //Handle Error
                        if (err) {
                            cb(err);
                            return;
                        }

                        //Handle Success
                        cb(null);
                    });
                }
            );
        }
    );
}

/* END OF SAVE FUNCTIONS */

//todo: to connect to a project, user/team name is required as well. now it only connects to owner projects
handler.connect = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var projectName = msg.projectName;
    var user = session.get('user');
    var developer = session.get('developer');

    console.warn("The Fullname of the connected user is: " + user.firstName + ' ' + user.lastName);
    console.warn("The projectName to connect is: " + projectName);
    // console.warn("The projectTitle is: " + projectTitle);


    //Does A project with that name already exist for this developer?
    database.findOne(database.Project, {name: projectName, owner: developer._id},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (object_found) {
                //Bind it to session
                bindProject(session, object_found);

                next(null, {code: "success", project:object_found});
            }
            else {
                next(null, {code: "notfound"});
            }
        }
    );
};


function createProjectDirectories(libraryName, userName)
{
    var userPath = path.resolve("../web-server/public") + '/assets/' + userName;

    fs.ensureDirSync(userPath + '/script/' + libraryName);
    fs.ensureDirSync(userPath + '/image/' + libraryName);
    fs.ensureDirSync(userPath + '/sound/' + libraryName);
    fs.ensureDirSync(userPath + '/model/' + libraryName);
    fs.ensureDirSync(userPath + '/data/' + libraryName);
    fs.ensureDirSync(userPath + '/project/' + libraryName);
    fs.ensureDirSync(userPath + '/thumbnail/' + libraryName);
    fs.ensureDirSync(userPath + '/incoming');
}

function bindProject(session, project)
{
    session.bind(project);

    session.set('project', project);
    session.push('project', function(err) {
        if(err) {
            console.error('set project for session service failed! error is : %j', err.stack);
        }
    });
}

handler.updateProjectEntry = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    database.findOne(database.Project, {_id: msg.projectId},
        function (err, project_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Reflect this??
            if (msg.field=="tags")
                project_found.tags=msg.newValue;

            project_found.markModified(msg.field);
            project_found.save(function (err) {
                //Handle Error
                if (err) {
                    next(null, {code: "error"});
                    return console.error(err);
                }

                //Handle Success
                next(null, {code: "success"});
            });
        }
    );
};

//THIS IS A REMOTE BUT LETS TRY I HERE
handler.createIncludeQuery = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //var user = session.get('user');
    //var developer = session.get('developer');

    console.warn("Creating test Include Query");

    var includeQuery = msg.includeQuery;
    var includeTags = msg.includeTags;

    var raw_IncludeQuery = {tags: includeTags, query: includeQuery};

    //Create IncludeQuery
    database.create(database.IncludeQuery, raw_IncludeQuery,
        function (err, objCreated_IncludeQuery) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success

            console.warn("Success Creating Include Query");
            next(null, {code: "success", includeQuery: objCreated_IncludeQuery});
        }
    );

};