/**
 * Created by Aris on 2/11/2015.
 */

// INIT //
var mongoose = require('mongoose') , Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
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
userSchema.plugin(deepPopulate, {});
var User = mongoose.model('User', userSchema);
exp.User = User;

//Team
var teamSchema = mongoose.Schema({
    name: String,       //unique, cannot be renamed
    title: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    accessControl: [{type: Schema.Types.ObjectId, ref: 'AccessEntry'}], //special tags, like can a user in a team create projects on behalf of the team, rename the team, etc
    developerReference: {type: Schema.Types.ObjectId, ref: 'Developer'}
});
teamSchema.plugin(deepPopulate, {});
var Team = mongoose.model('Team', teamSchema);
exp.Team = Team;

//Developer
var developerSchema = mongoose.Schema({
    isTeam: Boolean,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    team: {type: Schema.Types.ObjectId, ref: 'Team'},
    tags: [String]
});
developerSchema.plugin(deepPopulate, {});
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
    accessControl: [{type: Schema.Types.ObjectId, ref: 'AccessEntry'}]
});
projectSchema.plugin(deepPopulate, {});
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
moduleSchema.plugin(deepPopulate, {});
var Module = mongoose.model('Module', moduleSchema);
exp.Module = Module;

//IncludeQuery
var includeQuerySchema = mongoose.Schema({
    tags: [String], //(for beginer editor, eventsheet editor, brick editor, programming, everything)
    queryHidden: String,
    queryVisible: String,
    projectReference: {type: Schema.Types.ObjectId, ref: 'Project'} //to query the includes externally
});
includeQuerySchema.plugin(deepPopulate, {});
var IncludeQuery = mongoose.model('IncludeQuery', includeQuerySchema);
exp.IncludeQuery = IncludeQuery;

//Asset
var assetSchema = mongoose.Schema({
    name: String,  //unique in user->type scope, cannot be renamed  (it is auto-completed to dir+fileName, replacing /'s with .'s)
    fork: {type: Schema.Types.ObjectId, ref: 'Asset'},
    owner: {type: Schema.Types.ObjectId, ref: 'Developer'},		//use to find Url,  use with name to find uid
    type: String,			    //use to find Url,  use with name to find uid
    dir: String,				//use to find Url
    fileName: String,		    //use to find Url
    fileExtension: String,	    //use to find Url
    title: String,
    fileSize: Number,
    componentType: String,     //EventSheet Entry, Behavior, Spriter, stuff like that.. or null or "" if the asset is not a component (a component asset has a structure that the editor will expect from that type)
    tags: [String], //here as a tag we can include the projectname that I was initially uploaded for
    accessControl: [{type: Schema.Types.ObjectId, ref: 'AccessEntry'}],
    assetDependancies: [{type: Schema.Types.ObjectId, ref: 'Asset'}] //egc classes and asset grouping
});
assetSchema.plugin(deepPopulate, {});
var Asset = mongoose.model('Asset', assetSchema);
exp.Asset = Asset;

//AccessEntry
var accessEntrySchema = mongoose.Schema({
    actionTag: String, //action tags: view, use, read, fork, write, readPM, readForum, readGit, writePM, writeForum, writeGit, ...
    public: Boolean,
    private: [{type: Schema.Types.ObjectId, ref: 'Developer'}],
    password: String,
    sourceReference: {type: Schema.Types.ObjectId} //no ref cause it can be either Project, Asset, or Team
});
accessEntrySchema.plugin(deepPopulate, {});
var AccessEntry = mongoose.model('AccessEntry', accessEntrySchema);
exp.AccessEntry = AccessEntry;

//Sliced
var slicedSchema = mongoose.Schema({
    soundService: String,
    logicService: String,
    inputService: String,
    commsService: String,
    eventService: String,
    displayService: String
});
slicedSchema.plugin(deepPopulate, {});
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

    newObject.save(cb);
};

//Generic Find
exp.find = function(classname, raw_object_query, cb) {
    classname.find(raw_object_query, cb);
};

//Generic Find And Populate
exp.findAndPopulate = function(classname, raw_object_query, populate, cb) {
    classname.find(raw_object_query).populate(populate).exec(cb);
};

//Generic Find And DeepPopulate
exp.findAndDeepPopulate = function(classname, raw_object_query, populate, cb) {
    classname.find(raw_object_query).deepPopulate(populate).exec(cb);
};



//Generic Find One
exp.findOne = function(classname, raw_object_query, cb) {
    classname.findOne(raw_object_query, cb);
};

//Generic Find One And Populate
exp.findOneAndPopulate = function(classname, raw_object_query, populate, cb) {
    classname.findOne(raw_object_query).populate(populate).exec(cb);
};

//Generic Find One And DeepPopulate
exp.findOneAndDeepPopulate = function(classname, raw_object_query, populate, cb) {
    classname.findOne(raw_object_query).deepPopulate(populate).exec(cb);
};

exp.checkUser = function(p_username, p_email, p_key, cb) {
    User.findOne({ key: p_key }, function (err, user) {
        if (err) {cb("error"); return console.error(err);}
        if (!user)
            User.findOne({name: new RegExp('^'+p_username+'$', "i")}, function (err, user) {
                if (err) {cb("error"); return console.error(err);}
                if (!user)
                    User.findOne({ email: p_email }, function (err, user) {
                        if (err) {cb("error"); return console.error(err);}
                        if (!user)
                            cb("clear");
                        else cb("email");
                    });
                else cb("username");
            });
        else cb("key");
    });
};


exp.accessUser = function(username, password, cb)
{
    User.findOne({ name: new RegExp('^'+username+'$', "i"), password: password }, function (err, user) {
        if (err) {cb("error"); return console.error(err);}
        if (!user)
            cb("nomatch");
        else
        {
            Developer.findOne({user: user._id}, function (err, developer) {
                if (err) {
                    cb("error");
                    return console.error(err);
                }
                if (!developer)
                    cb("error");
                else
                    cb("match", user, developer);
            });
        }
    });
};


/*
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


*/

