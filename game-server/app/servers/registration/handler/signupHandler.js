var crc = require('crc');
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
handler.signup = function(msg, session, next) {
    var self = this;
    var uid = msg.uid;
    var fullname = msg.fullname;
    var email = msg.email;
    var key = msg.key;
    var username = msg.username;
    var password = msg.password;
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

        console.warn("Comparing calculated: " + key2.toLowerCase() + ", with given: " + key1crc.toLowerCase());

        if (key2.toLowerCase()==key1crc.toLowerCase())
            keyValid=true;
    }



    if (keyValid)
    {
        console.warn("Key Valid for: " + fullname + ", " + email);
        var acc = { fullname: fullname, email:email, key:key, username:username, password:password };

        //Search if key exists, then if user exists, then if email exists
        database.checkAccount(acc,
        function (code) {
            if (code=="clear")
                database.registerAccount(acc,
                    function (code) {
                        next(null, {code: code});
                    });
            else next(null, {code: code});
        });
    }
    else
    {
        console.warn("Key invalid for: " + fullname + ", " + email);
        next(null, {code: "keyinvalid"});
    }
};