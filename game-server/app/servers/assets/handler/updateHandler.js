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


handler.addProjectMainModuleAssetReference = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    database.findOne(database.Module, {_id: project.moduleMain},
        function (err, module_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            console.warn("MAIN MODULE ASSETS: " + module_found.assets);

            //Handle Success
            next(null, {code: "success"});
        }
    );
};