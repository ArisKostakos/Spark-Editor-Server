/**
 * Created by Aris on 2/11/2015.
 */
var mongoose = require('mongoose') , Schema = mongoose.Schema;


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
    owner: {type: Schema.Types.ObjectId, ref: 'User'},


    //permission stuff (run, read, write)
    runPublic: Boolean,
    runAccess: [{type: Schema.Types.ObjectId, ref: 'User'}],
    readPublic: Boolean,
    readAccess: [{type: Schema.Types.ObjectId, ref: 'User'}],
    writePublic: Boolean,
    writeAccess: [{type: Schema.Types.ObjectId, ref: 'User'}],

    //so the project doesn't know about assets.. just components..
    //skc asset? whatever..
    components: [{type: Schema.Types.ObjectId, ref: 'Component'}], //is this a query? no this is a tree.. library isn't a tree.. this is though...
    //that's why in library we can have just a behavior there.. as a root.. cant do that here
    library: [String] //of include which is a query on Components, like this. regular expressions should be allowed to...
    //include
    //owner    //optional filter or * for all
    //type      //optional filter or * for all
    //libraryName   //optional filter or * for all
    //subDir    //optional filter or * for all
    //filename  //optional filter or * for all
});
var Project = mongoose.model('Project', projectSchema);



var componentSchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    type: String, //Object, Material, Behavior, Light, ...
    subType: String, //2D, 3D, Input, Movement, ...

    libraryName: String,  //a user has libraries. no library with same name

    componentname: String, //a library has components. no component with the same name, inside a library

    //this is both for read access.. no one without project access can write to it, just use it or fork it (project access?)
    public: Boolean, //and if its private, also do the one below
    access: [{type: Schema.Types.ObjectId, ref: 'User'}], // an array of usernames Strings (or team strings), or Accounts and Teams, doih..


    assets: [{type: Schema.Types.ObjectId, ref: 'Asset'}], //of Assets
    mainAsset: {type: Schema.Types.ObjectId, ref: 'Asset'},
    thumbnail:String, //default ("Implicit") which takes it from type instead

    //an object can have object children
    children: [{type: Schema.Types.ObjectId, ref: 'Component'}], //of Components
    parent: {type: Schema.Types.ObjectId, ref: 'Component'}, //Component, //or null

    //an object will have allowed childrenTypes and/or allowed parentTypes
    parentTypes: [String], //of String Component allowed types/subtypes of this form [type:subtype]
    childrenTypes: [String], //of String Component allowed types/subtypes of this form [type:subtype]

    ready: Boolean //??
});
var Component = mongoose.model('Component', componentSchema);



var assetSchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
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
    access: [{type: Schema.Types.ObjectId, ref: 'User'}], // an array of usernames Strings (or team strings), or Accounts and Teams, doih..

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
        console.warn("Mongooze Online:)");
    });
};


exp.createUser = function(usr, cb) {
    var newUser = new User(usr);
    newUser.save(function (err, user_created) {
         if (err) {cb("error"); return console.error(err);}
         cb("success",user_created);});
};

exp.createProject = function(prj, cb) {
    var newProject = new Project(prj);
    newProject.save(function (err, project_created) {
        if (err) {cb("error"); return console.error(err);}

        //SUCCESS
        Project.findOne({ projectname: project_created.projectname }).populate('owner').populate('runAccess')
                        .populate('readAccess').populate('writeAccess').exec(function (err, project_populated) {
            if (err) {cb("error"); return console.error(err);}
            cb("success",project_populated);
        });
    });
};

exp.createComponent = function(cmp, cb) {
    var newComponent = new Component(cmp);
    newComponent.save(function (err, component_created) {
        if (err) {cb("error"); return console.error(err);}
        cb("success",component_created);});
};

exp.createAsset = function(ast, cb) {
    var newAsset = new Asset(ast);
    newAsset.save(function (err, asset_created) {
        if (err) {cb("error"); return console.error(err);}
        cb("success",asset_created);});
};

exp.existsProject = function(projectname, cb) {
    Project.find({ projectname: projectname }, function (err, projects) {
        if (err) {cb("error"); return console.error(err);}

        if (projects.length==0)
            cb("nomatch");
        else
            cb("match",projects[0]);
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