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

        getDependancies(found, 0, [], msg, session, next);
    });
};


function getDependancies(darray, index, dependancies, msg, session, next)
{
    if (index<darray.length)
    {
        database.findOne(database.Asset, {owner: session.get('developer')._id, type: msg.type, name: darray[index]},
            function (err, object_found) {
                //Handle Error
                if (err) {
                    next(null, {code: "error"});
                    return console.error(err);
                }

                //Handle Success
                if (object_found)
                {
                    console.warn('Adding Dependancy: '+ object_found.name);
                    dependancies.push(object_found._id);
                    getDependancies(darray, index+1, dependancies, msg, session, next);
                }
                else
                {
                    //dependancy not found. exiting...
                    next(null, {code: "dMissing", dependancyName: darray[index]});
                }
            }
        );
    }
    else
    {
        createAsset(dependancies, msg, session, next);
    }
}

function createAsset(dependancies, msg, session, next)
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
        tagsFinal = tags.split(' ');
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
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (object_found)
            {
                //If already exists, exit
                next(null, {code: "exists", assetName: object_found.name});
            }
            else
            {
                //Move Asset File
                fs.move(assetSource, assetTarget, function(err) {
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                    var raw_Asset = {name: assetName, owner: developer._id, type: type, dir: finalDir, fileName: rawName, fileExtension: rawExtension, title: assetName, fileSize: fileSize, componentType: componentTypeFinal, tags: tagsFinal, accessControl: [], assetDependancies: dependancies};

                    //Create Asset
                    database.create(database.Asset, raw_Asset,
                        function (err, objCreated_Asset) {
                            //Handle Error
                            if (err) {
                                next(null, {code: "error"});
                                return console.error(err);
                            }

                            //Send Success Signal
                            next(null, {code: "success", assetName: objCreated_Asset.name});
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

