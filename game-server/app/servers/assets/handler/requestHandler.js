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
                                baseClass: database.mongoose.Types.ObjectId("5518af05ba008d6a082229bf"), behaviors: [],
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