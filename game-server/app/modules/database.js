/**
 * Created by Aris on 2/11/2015.
 */

// INIT //
var mongoose = require('mongoose') , Schema = mongoose.Schema;
var exp = module.exports;
var db = mongoose.connection;



// DB OBJECTS //

//User
var userSchema = mongoose.Schema({
    name: String,       //unique, cannot be renamed
    firstName: String,
    lastName: String,
    email: String,
    key: String,
    password: String,
    developerReference: {type: Schema.Types.ObjectId, ref: 'Developer'}
});
var User = mongoose.model('User', userSchema);
exp.User = User;

//Team
var teamSchema = mongoose.Schema({
    name: String,       //unique, cannot be renamed
    title: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    developerReference: {type: Schema.Types.ObjectId, ref: 'Developer'}
});
var Team = mongoose.model('Team', teamSchema);
exp.Team = Team;

//Developer
var developerSchema = mongoose.Schema({
    isTeam: Boolean,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    tags: [String]
});
var Developer = mongoose.model('Developer', developerSchema);
exp.Developer = Developer;

//Project
var projectSchema = mongoose.Schema({
    name: String,  //unique in user scope, cannot be renamed
    version: String,
    title: String,
    fork: {type: Schema.Types.ObjectId, ref: 'Project'},
    owner: {type: Schema.Types.ObjectId, ref: 'Developer'},
    sliced: {type: Schema.Types.ObjectId, ref: 'Sliced'},
    modules: [{type: Schema.Types.ObjectId, ref: 'Module'}],
    moduleMain: {type: Schema.Types.ObjectId, ref: 'Module'},
    tags: [String],	//template tag
    includes: [{type: Schema.Types.ObjectId, ref: 'IncludeQuery'}],
    accessControl: {type: Schema.Types.ObjectId, ref: 'AccessControl'}
});
var Project = mongoose.model('Project', projectSchema);
exp.Project = Project;

//Module
var moduleSchema = mongoose.Schema({
    name: String,   //unique in project scope
    requires: [{type: Schema.Types.ObjectId, ref: 'Module'}],
    assets: [{type: Schema.Types.ObjectId, ref: 'Asset'}],
    executeEntity: {type: Schema.Types.ObjectId, ref: 'Asset'},
    tags: [String] //possible tags: level, character, weaponsystem, ..
});
var Module = mongoose.model('Module', moduleSchema);
exp.Module = Module;

//IncludeQuery
var includeQuerySchema = mongoose.Schema({
    tags: [String], //(for beginer editor, eventsheet editor, brick editor, programming, everything)
    queryHidden: String,
    queryVisible: String
});
var IncludeQuery = mongoose.model('IncludeQuery', includeQuerySchema);
exp.IncludeQuery = IncludeQuery;

//Asset
var assetSchema = mongoose.Schema({
    fork: {type: Schema.Types.ObjectId, ref: 'Asset'},
    owner: {type: Schema.Types.ObjectId, ref: 'Developer'},		//use for uid & to find Url
    type: String,			    //use for uid & to find Url
    dir: String,				//use for uid & to find Url
    fileName: String,		    //use for uid & to find Url
    fileExtension: String,	    //use for uid & to find Url
    title: String,
    fileSize: Number,
    tags: [String], //here as a tag we can include the projectname that I was initially uploaded for
    accessControl: {type: Schema.Types.ObjectId, ref: 'AccessControl'},
    assetDependancies: [{type: Schema.Types.ObjectId, ref: 'Asset'}] //egc classes and asset grouping
});
var Asset = mongoose.model('Asset', assetSchema);
exp.Asset = Asset;

//AccessControl
var accessControlSchema = mongoose.Schema({
    viewPublic: Boolean,
    viewAccess: [{type: Schema.Types.ObjectId, ref: 'Developer'}],
    usePublic: Boolean,
    useAccess: [{type: Schema.Types.ObjectId, ref: 'Developer'}],
    readPublic: Boolean,
    readAccess: [{type: Schema.Types.ObjectId, ref: 'Developer'}],
    forkPublic: Boolean,
    forkAccess: [{type: Schema.Types.ObjectId, ref: 'Developer'}],
    writePublic: Boolean,
    writeAccess: [{type: Schema.Types.ObjectId, ref: 'Developer'}]
});
var AccessControl = mongoose.model('AccessControl', accessControlSchema);
exp.AccessControl = AccessControl;

//Sliced
var slicedSchema = mongoose.Schema({
    soundService: String,
    logicService: String,
    inputService: String,
    commsService: String,
    eventService: String,
    displayService: String
});
var Sliced = mongoose.model('Sliced', slicedSchema);
exp.Sliced = Sliced;


// METHODS //

//Init
exp.init = function()
{
    mongoose.connect('mongodb://localhost/alpha');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback)
    {
        console.warn("Mongooze Online:)");
    });
};

//Create Object
exp.create = function(classname, raw_object, cb) {
    var newObject = new classname(raw_object);

    newObject.save(function (err, object_saved) {
        cb(err, object_saved);
    });
};



exp.checkUser = function(p_username, p_email, p_key, cb) {
    User.find({ key: p_key }, function (err, users) {
        if (err) {cb("error"); return console.error(err);}
        if (users.length==0)
            User.find({ username: p_username }, function (err, users) {
                if (err) {cb("error"); return console.error(err);}
                if (users.length==0)
                    User.find({ email: p_email }, function (err, users) {
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


/*

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

        //do i really need to populate at creation? :/
        Project.findOne({ projectname: project_created.projectname, owner: project_created.owner }).populate('owner').populate('runAccess')
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

        //do i really need to populate at creation? :/ do they keep populated in the db or just the returned??
        Component.findOne({owner: component_created.owner, type: component_created.type , subType: component_created.subType , libraryName: component_created.libraryName, componentname: component_created.componentname }).populate('owner').populate('access')
            .populate('assets').populate('mainAsset').populate('children').populate('parent').exec(function (err, component_populated) {
                if (err) {cb("error"); return console.error(err);}

                cb("success",component_populated);
            });
    });
};

exp.createAsset = function(ast, cb) {
    var newAsset = new Asset(ast);
    newAsset.save(function (err, asset_created) {
        if (err) {cb("error"); return console.error(err);}
        cb("success",asset_created);});
};

exp.existsProject = function(projectquery, cb) {
    Project.findOne(projectquery).populate('owner').populate('runAccess')
        .populate('readAccess').populate('writeAccess').exec(function (err, projectFound) {
            if (err) {cb("error"); return console.error(err);}

            if (projectFound)
                cb("match",projectFound);
            else
                cb("nomatch");
    });
};

*/


/**
 * accessUser
 * @param {Object} opts
 * @api public
 */
/*
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
*/

/**
 * accessUser
 * @param {Object} opts
 * @api public
 */
/*
exp.getComponents = function(query, cb)
{
    //var componentsFound =[];

    Component.find(query, function (err, components) {
        if (err) {cb("error"); return console.error(err);}

        cb("success", components);
    });
};
*/