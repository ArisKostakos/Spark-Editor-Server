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
exp.registerAccount = function(acc)
{
     var newAccount = new Account(acc);

     newAccount.save(function (err, newAccount)
     {
         if (err) return console.error(err);
         console.warn("Mongooze: Account saved successfully!");
     });
};

/**
 * registerAccount
 * @param {Object} opts
 * @api public
 */
exp.checkAccount = function(acc, cb)
{
    var newAccount = new Account(acc);


    Account.find({ key: acc.key }, function (err, accounts) {
        if (err) {cb("error"); return console.error(err);}
        if (accounts.length==0)
            Account.find({ key: acc.username }, function (err, accounts) {
                if (err) {cb("error"); return console.error(err);}
                if (accounts.length==0)
                    Account.find({ key: acc.email }, function (err, accounts) {
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