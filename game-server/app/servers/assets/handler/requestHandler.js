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
    //database.findAndDeepPopulate(database.Asset, {owner: developer._id}, "fork owner accessControl assetDependancies owner.user",
    database.findAndDeepPopulate(database.Asset, {}, "fork owner accessControl assetDependancies owner.user",
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