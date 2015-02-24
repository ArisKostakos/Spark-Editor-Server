var fs = require('fs-extra');
var path = require('path');
var database = require('../../../modules/database');
var lwip = require('lwip'); //move me to new server for image manipulations..

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
    //SubDir (doesn't work yet. fix it when u use it, also EnsureDir to create it!!! for thumbnail too)
    var subDir = msg.subDir;

    //User Path
    var userPath = path.resolve("../web-server/public") + '/assets/' + user.username;
    fs.ensureDirSync(userPath);

    //Move real asset
    var assetUrl = userPath + '/images/' + libraryName + subDir + '/' + fileName;
    var thumbnailUrl = userPath + '/thumbnails/' + libraryName + subDir + '/' + fileName;
    fs.move(userPath + '/incoming/' + fileName, assetUrl, function(err) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        //create thumbnail
        createThumbnail(assetUrl, thumbnailUrl, 16, function(err){
            if (err) {next(null, {code: "error"}); return console.error(err)}

            //Copy an Image egc
            //..
            next(null, {code: "success"});
        });
    })




    //Create imageAssetDb

    //Create egcAssetDb

    //CreateComponentDb

    //send success signal


};

function createThumbnail(srcImageUrl, targetUrl, size, cb)
{
    // obtain an image object:
    lwip.open(srcImageUrl, function(err, image){
        if (err) {cb(err); return;}

        // define a batch of manipulations and save to disk
        image.batch()
            .resize(size)
            .writeFile(targetUrl, function(err){
                if (err) {cb(err); return;}

                // done.
                cb();
            });

    });
}

