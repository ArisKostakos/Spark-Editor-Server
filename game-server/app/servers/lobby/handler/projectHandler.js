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


handler.fork = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var projectName = msg.projectName;
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

                            //create new project (mark it forks blank, not a template, copy paste some blank stuff)
                            var raw_Project = {name: projectName, version: '0.0.1', title: projectName, owner: developer._id, fork: templateProject._id, modules: [], tags: [], includes: [], accessControl: []};

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

                                    // for all spark assetsDB with tag: blank
                                    database.findAndDeepPopulate(database.Asset, {owner: sparkDeveloperId, 'tags.0': templateProject.name}, "owner owner.user assetDependancies",
                                        function (err, objects_found) {
                                            //Handle Error
                                            if (err) {
                                                next(null, {code: "error"});
                                                return console.error(err);
                                            }

                                            //Handle Success
                                            forkAssets(self, session, objects_found,0,
                                                function (err) {
                                                    //Handle Error
                                                    if (err) {
                                                        next(null, {code: "error"});
                                                        return console.error(err);
                                                    }

                                                    //Handle Success
                                                    forkAssetDependancies(self, session, objects_found,0,
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

function forkAssets(self, session, assets, index, cb) {
    if (index<assets.length)
    {
        //put user into channel
        self.app.rpc.assets.createRemote.copy(session, assets[index], session.get('user'), session.get('developer'), function(err){
            //Handle Error
            if (err) {
                cb(err);
                return;
            }

            //Next
            forkAssets(self, session, assets, index+1, cb);
        });
    }
    else
    {
        cb(null);
    }
}

function forkAssetDependancies(self, session, assets, index, cb) {
    if (index<assets.length)
    {
        var asset = assets[index];

        //query forked asset
        console.warn('1: ' + {owner: session.get('developer')._id, type: asset.type, name: asset.name});
        database.findOne(database.Asset, {owner: session.get('developer')._id, type: asset.type, name: asset.name},
            function (err, object_found) {
                //Handle Error
                if (err) {cb(err); return;}

                //Handle Success
                if (object_found) {

                    //for each dependancy
                    forkAssetDependanciesDeep(self, session, object_found, asset.assetDependancies,0,
                        function (err) {
                            //Handle Error
                            if (err) {cb(err); return;}

                            //Next
                            forkAssetDependancies(self, session, assets, index+1, cb);
                        }
                    );
                }
                else {
                    cb("notfound");
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

function forkAssetDependanciesDeep(self, session, forkedAsset, assetDependancies, index, cb) {
    if (index < assetDependancies.length) {
        var assetDependancy = assetDependancies[index];

        //query forked dependancy
        console.warn('2: ' + {owner: session.get('developer')._id, type: assetDependancy.type, name: assetDependancy.name});
        database.findOne(database.Asset, {owner: session.get('developer')._id, type: assetDependancy.type, name: assetDependancy.name},
            function (err, object_found) {
                //Handle Error
                if (err) {cb(err); return;}

                //Handle Success
                if (object_found) {

                    //add to dependancies
                    forkedAsset.assetDependancies.push(object_found._id);

                    //Next
                    forkAssetDependanciesDeep(self, session, forkedAsset, assetDependancies, index+1, cb);
                }
                else {
                    cb("notfound");
                    return;
                }
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
                var raw_Project = {name: projectName, version: '0.0.1', title: projectName, owner: developer._id, modules: [], tags: tags, includes: [], accessControl: []};

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