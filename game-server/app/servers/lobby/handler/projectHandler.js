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

    var assetsPath = publicPath + '/assets';

    var userPath = assetsPath + '/' + username;

    var projectName = username + '_project';

    fs.ensureDirSync(userPath + '/scripts/' + projectName);
    fs.ensureDirSync(userPath + '/images/' + projectName);
    fs.ensureDirSync(userPath + '/sounds/' + projectName);
    fs.ensureDirSync(userPath + '/models/' + projectName);
    fs.ensureDirSync(userPath + '/projects/' + projectName);

    var user = session.get('user');

    console.warn("The Fullname of the connected user is: " + user.fullname);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    var prj = { projectname: fullname, title:email, owner:key, runPublic:username, runAccess:password,
                readPublic: yyyy, readAccess:fffff, writePublic:fffff, writeAccess:fffff, components:fffff,
                library:ffff};

    database.checkProject(prj,
        function (code) {
            if (code=="clear")
                database.createProject(prj,
                    function (code) {
                        next(null, {code: code});
                    });
            else next(null, {code: code});
        });
    ///////////////////////////////////////////////////////////////////////////////////////////////
/*
    next(null, {
        code: "projectCreated"
    });*/
};

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}