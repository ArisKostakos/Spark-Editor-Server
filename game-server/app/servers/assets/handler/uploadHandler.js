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
handler.rawUpload = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    console.warn("The username of the connected user is: " + user.name);
    console.warn("The connected developer id is: " + developer._id);
    console.warn("The projectname of the connected user is: " + project.name);

    //fileName
    var fileName = msg.fileName;

    //fileSize
    var fileSize = msg.fileSize;

    //assetTitle
    var assetTitle = msg.assetTitle;

    //dir
    var dir = msg.dir;

    //type
    var type = msg.type;

    //componentType
    var componentType = msg.componentType;

    //tags
    var tags = msg.tags;

    //Asset Path
    var assetPath = path.resolve("../web-server/public") + '/assets';

    //User Path
    var userPath = assetPath + '/' + user.name;
    fs.ensureDirSync(userPath);

    //Asset Source Path
    var assetSource = userPath + '/incoming/' + fileName;

    //Asset Target Path
    var assetTarget = userPath + '/' + type + '/' + project.name + '/' + dir + '/' + fileName;

    //Read File
    fs.readFile(assetSource, function (err, data) {
        if (err) {next(null, {code: "error"}); return console.error(err)}


        console.log(data);
    });

    return;

    //Move real asset
    fs.move(assetSource, assetTarget, function(err) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        //create thumbnail
        createThumbnail(assetTarget, thumbnailUrl, 16, function(err){
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
                            next(null, {code: "success", component: compnt});
                        });
                    });
                });
            });
        });
    });
};


/**
 * New client entry registration server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.get = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    var user = session.get('user');
    var project = session.get('project');

    var queryArray = msg.queryArray;

    //for now, just check the first
    var queryFirst = queryArray[0];

    database.getComponents(queryFirst, function (code,components) {
        if (code=="error") {next(null, {code: "error"}); return;}

        //send success signal
        next(null, {code: "success", components: components});
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

