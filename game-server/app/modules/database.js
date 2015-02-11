/**
 * Created by Aris on 2/11/2015.
 */
var mongoose = require('mongoose');

var exp = module.exports;

var arxidia = "heeloo";
    /**
     * Init Db
     * @api public
     */
    exp.init = function()
    {
        arxidia="arxidia has been INITIALIZED";

        mongoose.connect('mongodb://localhost/test');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function (callback)
        {
            console.warn("CONNECTED TO MONGOOOOOOOOZEEEEEE!!!!:)!");
            var accountSchema = mongoose.Schema({
                fullname: String,
                email: String,
                key: String,
                username: String,
                password: String
        });
        var Account = mongoose.model('Account', accountSchema);
        /*
        var newAccount = new Account({ fullname: fullname, email:email, key:key, username:username, password:password });

        newAccount.save(function (err, newAccount) {
            if (err) return console.error(err);
            console.warn("Mongooze: Account saved successfully!");
        });

        Account.find(function (err, accounts) {
            if (err) return console.error(err);
            console.warn(accounts);
        });
        */
        //Kitten.find({ name: /^Fluff/ }, callback);
    });

    /**
     * registerAccount
     * @param {Object} opts
     * @api public
     */
    exp.registerAccount = function(opts)
    {
        console.warn("Debugging arxidia: " + arxidia);
        /*
        var newAccount = new Account({ fullname: fullname, email:email, key:key, username:username, password:password });

        newAccount.save(function (err, newAccount)
        {
            if (err) return console.error(err);
            console.warn("Mongooze: Account saved successfully!");
        });
        */
    };
};