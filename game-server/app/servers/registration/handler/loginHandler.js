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
handler.login = function(msg, session, next) {
    var self = this;
    var uid = msg.uid;
    var username = msg.username;
    var password = msg.password;
    var sessionService = self.app.get('sessionService');


    database.accessAccount(acc,
        function (code, account) {
            if (code=="match")
            {
                //create online user, bluh bluh
            }

            next(null, {code: code});
        });
};