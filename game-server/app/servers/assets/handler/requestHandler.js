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

handler.getPopulated = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');


    //Find Assets
    database.findAndDeepPopulate(database.Asset, {owner: developer._id, 'tags.0': project.name}, "fork owner accessControl assetDependancies owner.user",
    //database.findAndDeepPopulate(database.Asset, {}, "fork owner accessControl assetDependancies owner.user",
        function (err, objects_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", assets: objects_found});
        }
    );

};

//temp load everything
handler.getProjectAssets = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    //Find Assets
    database.find(database.Asset, {owner: developer._id, 'tags.0': project.name},
        function (err, objects_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", assets: objects_found});
        }
    );

};

//This will temp load all lib Conditions, Actions and Expressions..
//Later we an make it look up the project's include queries, and include those instead..
handler.getProjectIncludeAssets = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

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


                //Find Assets
                database.findAndDeepPopulate(database.Asset, {owner: sparkDeveloperId, 'tags.0': "lib", $or: [ { componentType: 'Condition' }, { componentType: 'Action' }, { componentType: 'Expression' }, { componentType: 'Behavior' } ]}   , "owner.user",
                    function (err, objects_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        next(null, {code: "success", assets: objects_found});
                    }
                );
            }
        }
    );
};

//Get all assets referenced in the main module of this project
handler.getProjectMainModuleAssets = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    database.findOneAndDeepPopulate(database.Module, {_id: project.moduleMain}, "assets assets.owner.user",
        function (err, module_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", assets: module_found.assets});
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

    //database.findOneAndDeepPopulate(database.Project, {_id: project._id}, "libraryCollections.baseClass libraryCollections.behaviors",
    database.findOneAndPopulate(database.Project, {_id: project._id}, "libraryCollections",
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

//temp load everything
handler.getAssetsOf = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    var userName = msg.userName;
    var projectName = msg.projectName;

    //Get User
    database.findOne(database.User, {name: userName},
        function (err, user_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (user_found) {
                //Find Assets
                database.find(database.Asset, {owner: user_found.developerReference, 'tags.0': projectName},
                    function (err, assets_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        next(null, {code: "success", assets: assets_found});
                    }
                );
            }
            else {
                next(null, {code: "error"});    //notfound
            }
        }
    );
};

//temp load everything
handler.getAssetsFromQuery = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    var query = msg.query;

    //Get User
    database.findOne(database.User, {name: userName},
        function (err, user_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (user_found) {
                //Find Assets
                database.find(database.Asset, {owner: user_found.developerReference, 'tags.0': projectName},
                    function (err, assets_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        next(null, {code: "success", assets: assets_found});
                    }
                );
            }
            else {
                next(null, {code: "error"});    //notfound
            }
        }
    );
};


//THIS IS A REMOTE BUT LETS TRY I HERE
handler.createLibraryCollection = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');


    console.warn("Creating Library Collection");


    var raw_LibraryCollection = {owner: developer._id, title: "Image", tileWidth: 64, tileHeight: 64, iconName: "libcat_image", titleColor: "rgb(59,185,176)", titleColorSelected: "rgb(65,80,97)", tags: [],
                                //baseClass: database.mongoose.Types.ObjectId("5518af05ba008d6a082229bf"), behaviors: [],
                                baseClass: "std.display.Image2D", behaviors: [],
                                importTypes: ["image"], filterTypes: ['image'], filterComponentTypes: [], filterTags: []};

    //Create Library Collection
    database.create(database.LibraryCollection, raw_LibraryCollection,
        function (err, objCreated_LibraryCollection) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success

            console.warn("Success Creating Library Collection");
            next(null, {code: "success", includeQuery: objCreated_LibraryCollection});
        }
    );

};