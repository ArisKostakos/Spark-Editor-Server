var fs = require('fs-extra');
var path = require('path');
var database = require('../../../modules/database');

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
   // var user = session.get('user');
   // var developer = session.get('developer');

  //This allows anyone to delete anyone's projects.. hmmmmm

    //Find Projects
    database.findOne(database.Project, {_id: msg.projectId},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Remove it
            object_found.remove();

            //Handle Success
            next(null, {code: "success"});
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
                database.findOne(database.Project, {name: forkedProjectName, owner: sparkDeveloperId},
                    function (err, object_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        if (object_found) {
                            var templateProject = object_found;

                            console.warn("Creating Main Module for forked project...");
                            //Create Main Module for this project
                            self.app.rpc.assets.createRemote.createModule(session, "Main", function(err, module_created){
                                //Handle Error
                                if (err) {
                                    next(null, {code: "error"});
                                    return console.error(err);
                                }

                                //Handle Success
                                //Re-get Module. The one I get from rpc apparently is not a proper Mongoose document and lacks .save().. I don't know.... :/
                                database.findOne(database.Module, {_id: module_created._id},
                                    function (err, module_found) {
                                        //Handle Error
                                        if (err) {
                                            next(null, {code: "error"});
                                            return console.error(err);
                                        }

                                        //Handle Success

                                        //create new project (mark it forks ForkedProject, not a template, copy paste some ForkedProject stuff)
                                        var raw_Project = {name: projectName, version: '0.0.1', title: projectTitle, owner: developer._id, fork: templateProject._id, modules: [module_found._id], moduleMain: module_found._id, tags: ['project'], includes: templateProject.includes, libraryCollections: templateProject.libraryCollections, accessControl: []};

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

                                                // for all spark assetsDB with tag: templateProject.name
                                                database.findAndDeepPopulate(database.Asset, {owner: sparkDeveloperId, 'tags.0': templateProject.name}, "owner owner.user assetDependancies",
                                                    function (err, objects_found) {
                                                        //Handle Error
                                                        if (err) {
                                                            next(null, {code: "error"});
                                                            return console.error(err);
                                                        }

                                                        //Handle Success
                                                        forkAssets(self, msg, session, objects_found,0,module_found,
                                                            function (err) {
                                                                //Handle Error
                                                                if (err) {
                                                                    next(null, {code: "error"});
                                                                    return console.error(err);
                                                                }

                                                                //Handle Success
                                                                forkAssetDependancies(self, msg, session, objects_found,0,
                                                                    function (err) {
                                                                        //Handle Error
                                                                        if (err) {
                                                                            next(null, {code: "error"});
                                                                            return console.error(err);
                                                                        }


                                                                        //success
                                                                        next(null, {code: "success"});
                                                                    }
                                                                );
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );
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

                //return project? hm
                next(null, {code: "success"});
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