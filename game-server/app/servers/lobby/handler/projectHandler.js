var crc = require('crc');
var mongoose = require('mongoose');
var fs = require('fs-extra');
var path = require('path');

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

    //var uid = msg.uid;
    //var fullname = msg.fullname;
    //var email = msg.email;
    //var key = msg.key;
    var username = msg.username;
    //var password = msg.password;

    var sessionService = self.app.get('sessionService');

    var publicPath = path.resolve("../web-server/public");
    console.warn("resolve: " + publicPath);

    var projectDir = crc.crc32(username) >>>0;
    projectDir = pad(projectDir.toString(16),8);
    projectDir = projectDir.toUpperCase();

    var dir = publicPath + '/Library/' + projectDir;
    fs.ensureDir(dir, function(err) {
        console.log(err); // => null
        var l_code = err!=null?err:"projectCreated";

        next(null, {
            code: l_code
        });
    })
};

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}