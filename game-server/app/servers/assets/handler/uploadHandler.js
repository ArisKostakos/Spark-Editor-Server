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


handler.rawUpload = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //user
    var user = session.get('user');

    //fileName
    var fileName = msg.fileName;

    //Asset Path
    var assetPath = path.resolve("../web-server/public") + '/assets';

    //User Path
    var userPath = assetPath + '/' + user.name;

    //Asset Source Path
    fs.ensureDirSync(userPath + '/incoming');
    var assetSource = userPath + '/incoming/' + fileName;

    //Read File
    fs.readFile(assetSource, 'utf8', function (err, data) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        var result = data.match(/extends ?\= ?(["'])(?:(?=(\\?))\2.)*?\1/g);
        var found = [];

        if (result)
            for (var i=0; i<result.length; i++) {
                var captured = result[i];

                if (captured.indexOf("'")!=-1)
                {
                    captured=captured.substring(captured.indexOf("'")+1,captured.lastIndexOf("'"));
                    if (found.indexOf(captured)==-1) found.push(captured);
                }
                else if (captured.indexOf('"')!=-1)
                {
                    captured=captured.substring(captured.indexOf('"')+1,captured.lastIndexOf('"'));
                    if (found.indexOf(captured)==-1) found.push(captured);
                }
            }

        for (var i=0; i<found.length; i++) {
            console.log(found[i]);
        }

        getDependancies(found, 0, [], msg, session, function (err, data) {
                if (err) {
                    next(null, data);
                    return console.error(err);
                }

                //Handle Success
                next(null, {code: data.code, asset: data.asset, assetName: data.asset.name});
            }
        );
    });
};


handler.deleteAsset = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

    //Find Asset
    database.findOne(database.Asset, {owner: developer._id, 'tags.0': project.name, name: msg.assetName},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Remove it
            object_found.remove();

            //Handle Success
            next(null, {code: "success"});
        }
    );
};

handler.deleteAssets = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');


    deleteAssetsById( msg.assetIds, 0, function (err, data) {
            if (err) {
                next(null, data);
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success"});
        }
    );
};

function deleteAssetsById(assetIds, index, cb)
{
    if (index<assetIds.length)
    {
        database.findOne(database.Asset, {_id: assetIds[index]},
            function (err, object_found) {
                //Handle Error
                if (err) {
                    cb(err, {code: "error"});
                    return;
                }

                //Handle Success
                if (object_found)
                {
                    //Remove it
                    object_found.remove();

                    deleteAssetsById(assetIds, index+1, cb);
                }
                else
                {
                    //dependancy not found. exiting...
                    cb("dMissing", {code: "dMissing"});
                }
            }
        );
    }
    else
    {
        //Handle Success
        cb(null, {code: "success"});
    }
}



handler.uploadAsset = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    if (msg.type=='image')
    {
        createAsset([], msg, session, function (err, data) {
            if (err) {
                next(null, data);
                return console.error(err);
            }

            //Handle Success
            var user = session.get('user');

            //Asset Path
            var assetPath = path.resolve("../web-server/public") + '/assets';

            //User Path
            var userPath = assetPath + '/' + user.name;

            //Source Url
            var assetUrl = userPath + '/' + data.asset.type + '/' + data.asset.dir + '/' + data.asset.fileName +  '.' + data.asset.fileExtension;

            //Target Url
            fs.ensureDirSync(userPath + '/' + 'thumbnail' + '/' + data.asset.dir);
            var thumbnailUrl = userPath + '/' + 'thumbnail' + '/' + data.asset.dir + '/' + data.asset.fileName +  '.' + data.asset.fileExtension;

            //create thumbnail
            createThumbnail(assetUrl, thumbnailUrl, 128, function(err) {
                if (err) {
                    next(null, {code: "error"});
                    return console.error(err);
                }

                //Handle Success
                next(null, {code: data.code, asset: data.asset});
            });
        });
    }
    //
    //..

};


function getDependancies(darray, index, dependancies, msg, session, cb)
{
    if (index<darray.length)
    {
        //database.findOne(database.Asset, {owner: session.get('developer')._id, type: msg.type, name: darray[index]}, //OK, here we should first look for name from the owner, otherwise look from other owners
        database.findOne(database.Asset, {type: msg.type, name: darray[index]},
            function (err, object_found) {
                //Handle Error
                if (err) {
                    cb(err, {code: "error"});
                    return;
                }

                //Handle Success
                if (object_found)
                {
                    console.warn('Adding Dependancy: '+ object_found.name);
                    dependancies.push(object_found._id);
                    getDependancies(darray, index+1, dependancies, msg, session, cb);
                }
                else
                {
                    //dependancy not found. exiting...
                    cb("dMissing", {code: "dMissing", dependancyName: darray[index]});
                }
            }
        );
    }
    else
    {
        createAsset(dependancies, msg, session, cb);
    }
}

function createAsset(dependancies, msg, session, cb)
{
    //Session bindings
    var user = session.get('user');
    var developer = session.get('developer');
    var project = session.get('project');

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
    var componentTypeFinal;
    if (componentType=='Undefined' || componentType.length==0)
        componentTypeFinal=null;
    else
        componentTypeFinal=componentType;

    //tags
    var tags = msg.tags;
    var tagsFinal;
    if (tags=='Undefined' || tags.length==0)
        tagsFinal=[project.name];
    else
    {
        tagsFinal = tags.split('&');
        tagsFinal.unshift(project.name);
    }

    //Asset Path
    var assetPath = path.resolve("../web-server/public") + '/assets';

    //User Path
    var userPath = assetPath + '/' + user.name;

    //get rawName
    var rawName = fileName.substring(0,fileName.lastIndexOf("."));

    //get rawExtension
    var rawExtension = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

    //get nameDir
    if (dir.length==0)
        var nameDir = project.name;
    else
        var nameDir = project.name + '.' + dir.replace(/[/\\]/g, '.');

    //get finalDir
    if (dir.length==0)
        var finalDir = project.name;
    else
        var finalDir = project.name + '/' + dir.replace(/[/\\]/g, '/');

    //get asset name
    var assetName = nameDir + '.' + rawName;

    //Asset Source Path
    var assetSource = userPath + '/incoming/' + fileName;

    //Asset Target Path
    fs.ensureDirSync(userPath + '/' + type + '/' + finalDir);
    var assetTarget = userPath + '/' + type + '/' + finalDir + '/' + fileName;

    //Already exists?
    database.findOne(database.Asset, {owner: developer._id, type: type, name: assetName},
        function (err, object_found) {
            //Handle Error
            if (err) {
                cb(err, {code: "error"});
                return;
            }

            //Handle Success
            if (object_found)
            {
                //If already exists, exit
                cb("exists", {code: "exists", assetName: object_found.name});
            }
            else
            {
                //Move Asset File
                fs.move(assetSource, assetTarget, {clobber:true}, function(err) {
                        if (err) {
                            cb(err, {code: "error"});
                            return;
                        }

                    var raw_Asset = {name: assetName, owner: developer._id, type: type, dir: finalDir, fileName: rawName, fileExtension: rawExtension, title: assetTitle, fileSize: fileSize, componentType: componentTypeFinal, tags: tagsFinal, accessControl: [], assetDependancies: dependancies};

                    //Create Asset
                    database.create(database.Asset, raw_Asset,
                        function (err, objCreated_Asset) {
                            //Handle Error
                            if (err) {
                                cb(err, {code: "error"});
                                return;
                            }

                            //Send Success Signal
                            cb(null, {code: "success", asset:objCreated_Asset});
                        });
                    }
                );
            }
        }
    );
}


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


handler.updateAssetFile = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');

    //user
    var user = session.get('user');

    //assetUserName
    var assetUserName = msg.assetUserName;

    //assetType
    var assetType = msg.assetType;

    //assetName
    var assetName = msg.assetName;

    //incomingFileName
    var incomingFileName = msg.incomingFileName;

    //Get User's Developer Id
    database.findOne(database.User, {name: assetUserName},
        function (err, user_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (user_found)
            {
                database.findOne(database.Asset, {owner: user_found.developerReference, type: assetType, name: assetName},
                    function (err, asset_found) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success
                        if (asset_found)
                        {
                            //Check if user is allowed to write to this asset, goes here?
                            //..

                            //Should check for dependancies here
                            //..

                            //should also update asset fileSize
                            //..

                            //asset urls

                            //Asset Path
                            var assetPath = path.resolve("../web-server/public") + '/assets';

                            //User Path
                            var userPath = assetPath + '/' + user.name;

                            //Asset Source Path
                            var assetSource = userPath + '/incoming/' + incomingFileName;

                            //Asset Target Path
                            var assetTarget = assetPath + '/' + assetUserName + '/' + asset_found.type + '/' + asset_found.dir + '/' + asset_found.fileName + '.' + asset_found.fileExtension;
                            console.warn("Moving File: " + assetSource + ", to: " + assetTarget);
                            //..
                            //Replace assetFile
                            fs.move(assetSource, assetTarget, {clobber:true}, function(err) {
                                if (err) {
                                    next(null, {code: "error"});
                                    return console.error(err);
                                }

                                //Handle Success
                                next(null, {code: "success"});
                            });
                        }
                        else
                        {
                            //asset not found. exiting...
                            next(null, {code: "error"});
                        }
                    }
                );
            }
            else
            {
                //user not found. exiting...
                next(null, {code: "error"});
            }
        }
    );
}