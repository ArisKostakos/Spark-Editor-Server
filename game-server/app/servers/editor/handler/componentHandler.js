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

    //Asset Path
    var assetPath = path.resolve("../web-server/public") + '/assets';

    //User Path
    var userPath = assetPath + '/' + user.username;
    fs.ensureDirSync(userPath);

    //Move real asset
    var assetUrl = userPath + '/images/' + libraryName + subDir + '/' + fileName;
    var thumbnailUrl = userPath + '/thumbnails/' + libraryName + subDir + '/' + fileName;
    fs.move(userPath + '/incoming/' + fileName, assetUrl, function(err) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        //create thumbnail
        createThumbnail(assetUrl, thumbnailUrl, 16, function(err){
            if (err) {next(null, {code: "error"}); return console.error(err)}

            //Copy/Create an Image egc
            var gameEntityName = fileName.slice(0, -3) + 'egc'
            var gameEntityUrl = userPath + '/scripts/' + libraryName + subDir + '/' + gameEntityName;
            fs.copy(assetPath + '/tempFactory/template_object2d.egc', gameEntityUrl, function(err) {
                if (err) {next(null, {code: "error"}); return console.error(err)}

                //Create imageAssetDb
                var astImage = { owner:user._id, type: 'images', libraryName: libraryName, subDir: subDir,
                    filename: fileName, filesize: fileSize, assetname: assetName, public: true, access: [user._id], ready: true};
                database.createAsset(astImage, function (code,asset_created) {
                    if (code=="error") {next(null, {code: "error"}); return;}

                    astImage = asset_created;

                    //Create egcAssetDb
                    var astEgc = { owner:user._id, type: 'scripts', libraryName: libraryName, subDir: subDir,
                        filename: gameEntityName, filesize: fileSize, assetname: gameEntityName, public: true, access: [user._id], ready: true};
                    database.createAsset(astEgc, function (code,asset_created) {
                        if (code=="error") {next(null, {code: "error"}); return;}

                        astEgc = asset_created;

                        //CreateComponentDb
                        var compnt = { owner:user._id, type: 'Object', subType: '2D', libraryName: libraryName, componentname: componentName,
                            public: true, access: [user._id], assets: [astEgc._id, astImage._id], mainAsset: astEgc._id, thumbnail: thumbnailUrl,
                            children: [], /*parent: xcp._id,*/ parentTypes: [], childrenTypes: [], ready: true};
                        database.createComponent(compnt, function (code,component_created) {
                            if (code=="error") {next(null, {code: "error"}); return;}

                            compnt = component_created;

                            //send success signal
                            next(null, {code: "success"});
                        });
                    });
                });
            });
        });
    });
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

