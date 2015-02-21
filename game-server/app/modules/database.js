/**
 * Created by Aris on 2/11/2015.
 */
var mongoose = require('mongoose');

var exp = module.exports;

var db = mongoose.connection;

var userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    key: String,
    username: String,
    password: String
    //team
});
var User = mongoose.model('User', userSchema);

var projectSchema = mongoose.Schema({
    projectname: String,
    title: String,
    owner: String,

    //permission stuff (run, read, write)

    //so the project doesn't know about assets.. just components..
    //skc asset? whatever..
    components: Array, //is this a query? no this is a tree.. library isn't a tree.. this is though...
    //that's why in library we can have just a behavior there.. as a root.. cant do that here
    library: Array //of include which is a query on Components, like this. regular expressions should be allowed to...
    //include
    //owner    //optional filter or * for all
    //type      //optional filter or * for all
    //libraryName   //optional filter or * for all
    //subDir    //optional filter or * for all
    //filename  //optional filter or * for all
});
var Project = mongoose.model('Project', projectSchema);


var componentSchema = mongoose.Schema({
    owner: String,
    type: String, //Object, Material, Behavior, Light, ...
    subType: String, //2D, 3D, Input, Movement, ...

    libraryName: String,  //an account has libraries. no library with same name

    componentname: String, //a library has components. no component with the same name, inside a library

    //this is both for read access.. no one without project access can write to it, just use it or fork it (project access?)
    public: Boolean, //and if its private, also do the one below
    access: Array, // an array of usernames Strings (or team strings), or Accounts and Teams, doih..


    assets: Array, //of Assets
    //mainasset???
    thumbnail:String, //default ("Implicit") which takes it from type instead

    //an object can have object children
    children: Array, //of Components
    parent: String, //Component, //or null

    //an object will have allowed childrenTypes and/or allowed parentTypes
    parentTypes: Array, //of String Component allowed types/subtypes of this form [type:subtype]
    childrenTypes: Array, //of String Component allowed types/subtypes of this form [type:subtype]

    ready: Boolean //??
});
var Component = mongoose.model('Component', componentSchema);


var assetSchema = mongoose.Schema({
    owner: String,
    type: String,   //image, script, sound, video, data, ...

    libraryName: String,  //std
    subDir: String,  //core

    filename: String,

    filesize: String, //in bytes

    assetname: String, //title of asset, disabled for script types
        //later, maybe u unify this. so scripts also take custom ids
        //and in lionML you write extends="carMovement" but meh..


    //this is both for read access.. no one without project access can write to it, just use it or fork it (project access?)
    public: Boolean, //and if its private, also do the one below
    access: Array, // an array of usernames Strings (or team strings), or Accounts and Teams, doih..

    ready: Boolean
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
 * registerUser
 * @param {Object} opts
 * @api public
 */
exp.registerUser = function(usr, cb)
{
     var newUser = new User(usr);

    newUser.save(function (err, newUser)
     {
         if (err) {cb("error"); return console.error(err);}
         cb("success");
     });
};

/**
 * checkUser
 * @param {Object} opts
 * @api public
 */
exp.checkUser = function(usr, cb)
{
    User.find({ key: usr.key }, function (err, users) {
        if (err) {cb("error"); return console.error(err);}
        if (users.length==0)
            User.find({ username: usr.username }, function (err, users) {
                if (err) {cb("error"); return console.error(err);}
                if (users.length==0)
                    User.find({ email: usr.email }, function (err, users) {
                        if (err) {cb("error"); return console.error(err);}
                        if (users.length==0)
                            cb("clear");
                        else cb("email");
                    });
                else cb("username");
            });
        else cb("key");
    });
};


/**
 * accessUser
 * @param {Object} opts
 * @api public
 */
exp.accessUser = function(usr, cb)
{
    User.find({ username: usr.username, password: usr.password }, function (err, users) {
        if (err) {cb("error"); return console.error(err);}
        if (users.length==0)
            cb("nomatch");
        else
            cb("match",users[0]);
    });
};