var fs = require('fs-extra');
var path = require('path');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

function toBuffer(ab) {
    console.warn("ab.byteLength: " + ab.byteLength);
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}


/**
 * New client entry registration server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.load = function(msg, session, next) {
    var self = this;
    /*
     var uid = msg.uid;
     var fullname = msg.fullname;
     var email = msg.email;
     var key = msg.key;
     var username = msg.username;
     var password = msg.password;
     */
    var filedata = msg.filedata;

    var sessionService = self.app.get('sessionService');

    var startIndex = filedata.indexOf(',');

    if (startIndex!=-1)
    filedata = filedata.slice(startIndex+1);


    console.warn("RECEIVED FILE: " + filedata);

    var buffer = new Buffer(filedata, 'base64');
    //var buffer = toBuffer(filedata);

    var publicPath = path.resolve("../web-server/public");
    var assetsPath = publicPath + '/assets';

    fs.writeFile(assetsPath+"/test", buffer, function(err) {
        if(err) {
            console.warn(err);
        } else {
            console.warn("The file was saved!");
            next(null, {
                code: "Got it, Stored it!"
            });
        }
    });
};