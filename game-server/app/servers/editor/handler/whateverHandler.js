var mongoose = require('mongoose');

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
handler.whatevs = function(msg, session, next) {
    var self = this;
    /*
     var uid = msg.uid;
     var fullname = msg.fullname;
     var email = msg.email;
     var key = msg.key;
     var username = msg.username;
     var password = msg.password;
     */
    var sessionService = self.app.get('sessionService');



    next(null, {
        code: "whatevs complete"
    });
};