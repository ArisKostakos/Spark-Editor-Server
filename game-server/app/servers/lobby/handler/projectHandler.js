var fs = require('fs-extra');
var path = require('path');
var database = require('../../../modules/database');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.listUserProjects = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var user = session.get('user');
    var developer = session.get('developer');

    console.warn("The Fullname of the connected user is: " + user.firstName + ' ' + user.lastName);
    console.warn("The connected developer id is: " + developer._id);

    //Find Projects
    database.find(database.Project, {owner:developer._id},
        function (err, objects_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            next(null, {code: "success", projects: objects_found});
        }
    );
};





handler.create = function(msg, session, next) {
    var self = this;
    var sessionService = self.app.get('sessionService');
    var projectName = msg.projectName;
    //var projectTitle = msg.projectTitle;
    var user = session.get('user');
    var developer = session.get('developer');

    console.warn("The Fullname of the connected user is: " + user.firstName + ' ' + user.lastName);
    console.warn("The projectName is: " + projectName);
   // console.warn("The projectTitle is: " + projectTitle);


    //Does A project with that name already exist for this developer?
    database.findOne(database.Project, {name: projectName, owner: developer._id},
        function (err, object_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            //Handle Success
            if (object_found)
                next(null, {code: "exists"});
            else
            {
                var raw_Project = {name: projectName, version: '0.0.1', title: projectName, owner: developer._id, modules: [], tags: [], includes: [], accessControl: []};

                //Create Project
                database.create(database.Project, raw_Project,
                    function (err, objCreated_Project) {
                        //Handle Error
                        if (err) {
                            next(null, {code: "error"});
                            return console.error(err);
                        }

                        //Handle Success

                        //Create directories
                        createProjectDirectories(objCreated_Project.name, user.name);

                        next(null, {code: "success", project: objCreated_Project});
                    }
                );
            }
        }
    );
};


/*
    database.existsProject({ projectname: projectName, owner: user._id },
        function (code, project) {
            if (code=="match")
            {
                //EXISTS. ACCESS IT
                console.warn("Project Exists: "+ project.projectname);

                //Bind it to session
                bindProject(session, project);

                //Return
                next(null, {code: "success", project: project});
            }
            else
            {
                //DOESNT EXIST. CREATE IT
                console.warn("Project does not exist yet!")

                var prj = { projectname: projectName, title: projectTitle, owner:user._id, runPublic:true, runAccess:[user._id],
                    readPublic: true, readAccess:[user._id], writePublic:true, writeAccess:[user._id], components:[],
                    library: [{owner:user._id, libraryName: projectName}, {libraryName: "std"}]};//fix the std query (spark owner)

                database.createProject(prj,
                    function (code,project_created) {
                        if (code=="success") {
                            //Bind it to session
                            bindProject(session, project_created);

                            //Create directories
                            createProjectDirectories(project_created.projectname,project_created.owner.username);
                        }
                        next(null, {code: code, project: project_created});
                    });
            }
        });
        */


function createProjectDirectories(libraryName, userName)
{
    var userPath = path.resolve("../web-server/public") + '/assets/' + userName;

    fs.ensureDirSync(userPath + '/scripts/' + libraryName);
    fs.ensureDirSync(userPath + '/images/' + libraryName);
    fs.ensureDirSync(userPath + '/sounds/' + libraryName);
    fs.ensureDirSync(userPath + '/models/' + libraryName);
    fs.ensureDirSync(userPath + '/data/' + libraryName);
    fs.ensureDirSync(userPath + '/projects/' + libraryName);
    fs.ensureDirSync(userPath + '/thumbnails/' + libraryName);
    fs.ensureDirSync(userPath + '/incoming');
}

function bindProject(session, project)
{
    session.bind(project);

    session.set('project', project);
    session.push('project', function(err) {
        if(err) {
            console.error('set project for session service failed! error is : %j', err.stack);
        }
    });
}