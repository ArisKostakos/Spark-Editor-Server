var crc = require('crc');
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
handler.signup = function(msg, session, next) {
    var self = this;
    var uid = msg.uid;
    var fullname = msg.fullname;
    var email = msg.email;
    var key = msg.key;
    var username = msg.username;
    var password = msg.password;
    var sessionService = self.app.get('sessionService');
    console.warn("Fullname11: "+ fullname);
    //KEY VALIDATION
    key = key.replace(/-/g, "");
    var keyValid=false;

    if (key.length==16)
    {
        var key1 = key.substr(0,8);
        var key2 = key.substr(8);

        var key1int = crc.crc32(key1) >>>0;
        var key1crc = key1int.toString(16);

        if (key2.toLowerCase()==key1crc.toLowerCase())
            keyValid=true;
    }



    if (keyValid)
    {
        console.warn("Key Valid!");
        mongoose.connect('mongodb://localhost/test');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback) {
            console.warn("CONNECTED TO MONGOOOOOOOOZEEEEEE POUTSAS!!!!:)!");
            var accountSchema = mongoose.Schema({
                fullname: String,
                email: String,
                key: String,
                username: String,
                password: String
            });
            var Account = mongoose.model('Account', accountSchema);

            console.warn("Fullname22: "+ fullname);

            var newAccount = new Account({ fullname: fullname, email:email, key:key, username:username, password:password });

            newAccount.save(function (err, newAccount) {
                if (err) return console.error(err);
                console.warn("Mongooze: Account saved successfully!");
            });

            Account.find(function (err, accounts) {
                if (err) return console.error(err);
                console.warn(accounts);
            });

        });
    }
    else
    {
        console.warn("Key invalid:(");
    }



    next(null, {
        code: "Sign up complete"
    });
};