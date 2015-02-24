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
handler.createObject2D = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    var user = session.get('user');
    var project = session.get('project');

    //componentName (it can be different than uploaded asset name)
    var componentName = msg.componentName;
    //libraryName (because it can be different than project name)
    var libraryName = msg.libraryName;
    //assetName (because it can be different than file name)
    var assetName = msg.assetName;
    //fileName
    var fileName = msg.fileName;
    //fileSize
    var fileSize = msg.fileSize;
    //SubDir (doesn't work yet!!!)
    var subDir = msg.subDir;

    //User Path
    var userPath = path.resolve("../web-server/public") + '/assets/' + user.username;
    fs.ensureDirSync(userPath);

    //Move real asset
    fs.move(userPath + '/incoming/' + fileName, userPath + '/images/' + libraryName + subDir + '/' + fileName, function(err) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        //create thumbnail
        //..
        next(null, {code: "success"});
    })


    //Copy an Image egc

    //Create imageAssetDb

    //Create egcAssetDb

    //CreateComponentDb

    //send success signal


};