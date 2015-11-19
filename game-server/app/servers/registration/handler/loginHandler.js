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


    database.accessUser(username, password,
        function (code, user, developer) {
            if (code=="match")
            {
                //Bind User
                session.bind(user);
                session.set('user', user);
                session.push('user', function(err) {
                    if(err) console.error('set user for session service failed! error is : %j', err.stack);
                });

                //Bind Developer
                session.bind(developer);
                session.set('developer', developer);
                session.push('developer', function(err) {
                    if(err) console.error('set developer for session service failed! error is : %j', err.stack);
                });
            }

            next(null, {code: code, developer:developer});
        });
};