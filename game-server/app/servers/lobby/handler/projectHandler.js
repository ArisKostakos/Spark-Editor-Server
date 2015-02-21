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
                console.warn("Project's Owner: "+ project.owner.username);
                //Bind it to session
                session.bind(project);

                session.set('project', project);
                session.push('project', function(err) {
                    if(err) {
                        console.error('set user for session service failed! error is : %j', err.stack);
                    }
                });

                //Return
                next(null, {code: "success"});
            }
            else
            {
                //DOESNT EXIST. CREATE IT
                console.warn("Project does not exist yet!")

                var prj = { projectname: user.username+"_alphaProject", title:user.username + " Alpha Project", owner:user._id, runPublic:true, runAccess:[user._id],
                    readPublic: true, readAccess:[user._id], writePublic:true, writeAccess:[user._id], components:[],
                    library:user.username+"_alphaProject_mainLib"};

                database.createProject(prj,
                    function (code,project_created) {
                        if (code=="success") {
                            console.warn("Project Created: " + project_created.projectname);
                            console.warn("Project's Owner: " + project_created.owner.username);
                        }
                        next(null, {code: code});
                    });
            }
        });


/*

    var publicPath = path.resolve("../web-server/public");
    console.warn("resolve: " + publicPath);

    var assetsPath = publicPath + '/assets';

    var userPath = assetsPath + '/' + username;

    var projectName = username + '_project';

    fs.ensureDirSync(userPath + '/scripts/' + projectName);
    fs.ensureDirSync(userPath + '/images/' + projectName);
    fs.ensureDirSync(userPath + '/sounds/' + projectName);
    fs.ensureDirSync(userPath + '/models/' + projectName);
    fs.ensureDirSync(userPath + '/projects/' + projectName);
*/
};

