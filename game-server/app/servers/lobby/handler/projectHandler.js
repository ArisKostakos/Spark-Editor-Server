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

/**
 * New client entry registration server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.create = function(msg, session, next) {
    var self = this;

    var sessionService = self.app.get('sessionService');

    var user = session.get('user');
    console.warn("The Fullname of the connected user is: " + user.fullname);

    var defaultProjectName = user.username+"_alphaProject";

    database.existsProject(defaultProjectName,
        function (code, project) {
            if (code=="match")
            {
                //EXISTS. ACCESS IT
                console.warn("Project Exists: "+ project.projectname);

                //Bind it to session
                bindProject(session, project);

                //Return
                next(null, {code: "success"});
            }
            else
            {
                //DOESNT EXIST. CREATE IT
                console.warn("Project does not exist yet!")

                var prj = { projectname: user.username+"_alphaProject", title:user.username + " Alpha Project", owner:user._id, runPublic:true, runAccess:[user._id],
                    readPublic: true, readAccess:[user._id], writePublic:true, writeAccess:[user._id], components:[],
                    library: [user.username+"_alphaProject", "std"]};//projectname:alphaproject, library,make them queries

                database.createProject(prj,
                    function (code,project_created) {
                        if (code=="success") {
                            //Bind it to session
                            bindProject(session, project_created);

                            //Create directories
                            createProjectDirectories(project_created.projectname,project_created.owner.username);
                        }
                        next(null, {code: code});
                    });
            }
        });
};

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