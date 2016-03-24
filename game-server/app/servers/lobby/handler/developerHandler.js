var database = require('../../../modules/database');
//var deepPopulate = require('mongoose-deep-populate');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.populateDevelopers = function(msg, session, next) {
    var self = this;

    var developerIds = msg.developerIds;

    console.warn("Requesting: " + developerIds);

    //Find Developers
    database.findAndPopulate(database.Developer, {_id: { $in: developerIds } }, "user team",
        function (err, developers_found) {
            //Handle Error
            if (err) {
                next(null, {code: "error"});
                return console.error(err);
            }

            console.warn("Found: " + developers_found.length + " developers! yay!");

            //Handle Success
            next(null, {code: "success", developers: developers_found});
        }
    );
};