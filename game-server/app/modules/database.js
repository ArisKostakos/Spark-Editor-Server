/**
 * Created by Aris on 2/11/2015.
 */
var mongoose = require('mongoose');

var exp = module.exports;

var db = mongoose.connection;

var accountSchema = mongoose.Schema({
    fullname: String,
    email: String,
    key: String,
    username: String,
    password: String
});
var Account = mongoose.model('Account', accountSchema);

/**
 * Init Db
 * @api public
 */
exp.init = function()
{
    mongoose.connect('mongodb://localhost/test');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback)
    {
        //console.warn("Mongooze Online:)");
    });
};

/**
 * registerAccount
 * @param {Object} opts
 * @api public
 */
exp.registerAccount = function(acc, cb)
{
     var newAccount = new Account(acc);

     newAccount.save(function (err, newAccount)
     {
         if (err) {cb("error"); return console.error(err);}
         cb("success");
     });
};

/**
 * registerAccount
 * @param {Object} opts
 * @api public
 */
exp.checkAccount = function(acc, cb)
{
    Account.find({ key: acc.key }, function (err, accounts) {
        if (err) {cb("error"); return console.error(err);}
        if (accounts.length==0)
            Account.find({ username: acc.username }, function (err, accounts) {
                if (err) {cb("error"); return console.error(err);}
                if (accounts.length==0)
                    Account.find({ email: acc.email }, function (err, accounts) {
                        if (err) {cb("error"); return console.error(err);}
                        if (accounts.length==0)
                            cb("clear");
                        else cb("email");
                    });
                else cb("username");
            });
        else cb("key");
    });
};