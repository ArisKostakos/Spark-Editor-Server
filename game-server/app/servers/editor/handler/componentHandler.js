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


/**
 * New client entry registration server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.load = function(msg, session, next) {
    var self = this;

    //var filedata = msg.filedata;

    var sessionService = self.app.get('sessionService');

/*
    fs.writeFile(assetsPath+"/test", buffer, function(err) {
        if(err) {
            console.warn(err);
        } else {
            console.warn("The file was saved!");
            next(null, {
                code: "Got it, Stored it!"
            });
        }
    });*/

    var user = session.get('user');
    var project = session.get('project');
    console.warn("The Fullname of the connected user is: " + user.fullname);
    console.warn("The User is connected to the Project: " + project.title);

    next(null, {
        code: "hi"
    });
};