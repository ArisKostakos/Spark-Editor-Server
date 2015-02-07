var crc = require('crc');

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
handler.signup = function(msg, session, next) {
    var self = this;
    var uid = msg.uid;
   // var fullname = msg.fullname;
    //var email = msg.email;
    var key = msg.key;
    //var username = msg.username;
    //var password = msg.password;
    var sessionService = self.app.get('sessionService');

    //KEY VALIDATION
    key = key.replace(/-/g, "");
    var keyValid=false;

    if (key.length==16)
    {
        var key1 = key.substr(0,8);
        var key2 = key.substr(8);

        var key1int = crc.crc32(key1) >>>0;
        var key1crc = key1int.toString(16);

        console.warn("key1: " + key1);
        console.warn("key2: " + key2);
        console.warn("key1crc: " + key1crc);

        if (key2.toLowerCase()==key1crc.toLowerCase())
        {
            console.warn("VALIDATED!!");
            keyValid=true;
        }
    }



    if (keyValid)
    {
        console.warn("Key Valid!");
        next(null, {
            code: "Key Valid!"
        });
    }
    else
    {
        console.warn("Key invalid:(");
        next(null, {
            code: "Key invalid:("
        });
    }
};