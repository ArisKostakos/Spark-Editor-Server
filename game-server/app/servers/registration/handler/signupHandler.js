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


     console.warn('The key I got was: ' + key);
    console.warn('The crc32 of it is: ' + crc.crc32(key));


    next(null, {
        code: "KEY GEN STUFFFF"
    });
};