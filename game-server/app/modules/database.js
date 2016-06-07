/**
 *Created by Aris on 2/11/2015.
 * testing git
 */

// INIT //
var mongoose = require('mongoose') , Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var exp = module.exports;
var db = mongoose.connection;

exp.mongoose = mongoose;

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
    moduleMain: String,   //name of the module from the modules array
    tags: [String],	//template tag
    includes: [{type: Schema.Types.ObjectId, ref: 'IncludeQuery'}],
    libraryCollections: [{type: Schema.Types.ObjectId, ref: 'LibraryCollection'}],
    accessControl: [{type: Schema.Types.ObjectId, ref: 'AccessEntry'}]
});
projectSchema.plugin(deepPopulate, {});
var Project = mongoose.model('Project', projectSchema);
exp.Project = Project;

//Module
var moduleSchema = mongoose.Schema({
    name: String,   //unique in project scope
    fork: {type: Schema.Types.ObjectId, ref: 'Module'},
    owner: {type: Schema.Types.ObjectId, ref: 'Developer'},
    requires: [String], //Weak linking by ModuleName (project scope)
    assets: [{type: Schema.Types.ObjectId, ref: 'Asset'}],
    executeEntity: {type: Schema.Types.ObjectId, ref: 'Asset'},
    tags: [String] //here as a tag (0) we include the projectname that I was initially created for
});
moduleSchema.plugin(deepPopulate, {});
var Module = mongoose.model('Module', moduleSchema);
exp.Module = Module;

//IncludeQuery
var includeQuerySchema = mongoose.Schema({
    tags: [String], //(for beginer editor, eventsheet editor, brick editor, programming, everything)
    query: Object
});
includeQuerySchema.plugin(deepPopulate, {});
var IncludeQuery = mongoose.model('IncludeQuery', includeQuerySchema);
exp.IncludeQuery = IncludeQuery;

//LibraryCollection
var libraryCollectionSchema = mongoose.Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Developer'},
    title: String,  //'Sprites'
    //filter 'query'
    filterTypes: [String], //image,sound,data,..
    filterComponentTypes: [String] ,
    filterTags: [String], //SpriterMain, ..
    //import
    importTypes: [String], //[image,spritesheet,spriter,sound,egc,..]
                           //on the editor, we maintain a hash that links file extensions to importTypes, such as [image,spritesheet,spriter,sound,egc,..]
                           //Also, the editor knows how to handle an import type of say image (appropriate dialog, and also what asset to create on the DB, and what tags, etc..)
    //on drag to stage creation
    baseClass: String, //{type: Schema.Types.ObjectId, ref: 'Asset'}, // the base class extended when added to stage
    behaviors: [String], //[{type: Schema.Types.ObjectId, ref: 'Asset'}], // (a list of behavior components that will be added automatically when thingie added to stage
    //display
    tileWidth: Number, //64
    tileHeight: Number, //64
    iconName: String, //libSpritesIcon
    titleColor: String, //#34002f or red
    titleColorSelected: String, //#34002f or red
    tags: [String] // (for whatever, special conditions(background Image), weak linking, etc..) [first tag is for project created? hmm eh.. nuhhhhhhhhh] for now its used as a temp Base Asset name (instead of asset reference)
});
libraryCollectionSchema.plugin(deepPopulate, {});
var LibraryCollection = mongoose.model('LibraryCollection', libraryCollectionSchema);
exp.LibraryCollection = LibraryCollection;


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
    componentType: String,       //EventSheet Entry, Behavior, Spriter, stuff like that.. or null or "" if the asset is not a component (a component asset has a structure that the editor will expect from that type)
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

