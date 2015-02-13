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

//maybe.. in accounts u have a library array
//and then a library schema where u define if the etire library can be made public
//or define access, default options when u upload smth, etc?
//hm hm hm maybe too much hassle
//i think so..

var projectSchema = mongoose.Schema({
    projectname: String,
    title: String,
    owner: String,
    //password,group permission stuff

    //very tricky stuff.. how to import 1
    //thing for an external 'library'
    //or everything from external library
    //and just have it show on the editor's
    //library for that project
    //high level stuff
    //libraries: Array  //of libraryName Strings

    //how about..
    includes: Array //of include which is

    //include
    //owner    //optional filter or * for all
    //type      //optional filter or * for all
    //libraryName   //optional filter or * for all
    //subDir    //optional filter or * for all
    //filename  //optional filter or * for all

    //so do a include Query in Assets and display what you
    //found
    //regular expressions should be allowed to...
    //solved beatch!
});
var Project = mongoose.model('Project', projectSchema);




var assetSchema = mongoose.Schema({
    owner: String,
    type: String,

    libraryName: String,  //std
    subDir: String,  //core

    filename: String,

    filesize: String, //in bytes

    assetname: String, //title of asset, disabled for script types
        //later, maybe u unify this. so scripts also take custom ids
        //and in lionML you write extends="carMovement" but meh..

    //password: String,
    //team

    public: Boolean //and if its private, also do the one below
    //access: Array // an array of usernames Strings
});
var Asset = mongoose.model('Asset', assetSchema);

/**
 * Init Db
 * @api public
 */
exp.init = function()
{
    mongoose.connect('mongodb://localhost/alpha');
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


/**
 * registerAccount
 * @param {Object} opts
 * @api public
 */
exp.accessAccount = function(acc, cb)
{
    Account.find({ username: acc.username, password: acc.password }, function (err, accounts) {
        if (err) {cb("error"); return console.error(err);}
        if (accounts.length==0)
            cb("nomatch");
        else
            cb("match",accounts[0]);
    });
};