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
    fs.readFile(assetSource, 'utf8', function (err, data) {
        if (err) {next(null, {code: "error"}); return console.error(err)}

        var result = data.match(/extends ?\= ?(["'])(?:(?=(\\?))\2.)*?\1/g);
        var found = [];

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
    next(null, {code: "success"});
}

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

