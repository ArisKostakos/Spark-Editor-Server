var crc = require('crc');
var mongoose = require('mongoose');
var fs = require('fs-extra');

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
handler.create = function(msg, session, next) {
    var self = this;
    /*
    var uid = msg.uid;
    var fullname = msg.fullname;
    var email = msg.email;
    var key = msg.key;
    var username = msg.username;
    var password = msg.password;
    */
    var sessionService = self.app.get('sessionService');

    //create folders/files
    //console.warn("I am displaying the home directory: " + process.env);
    console.log(process.env);

    next(null, {
        code: "Create Project complete"
    });
};