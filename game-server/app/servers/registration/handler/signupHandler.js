var crc = require('crc');
var database = require('../../../modules/database');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

/**
 * New client entry registration server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.signup = function(msg, session, next) {
    var self = this;
    var uid = msg.uid;
    var fullname = msg.fullname;
    var email = msg.email;
    var key = msg.key;
    var username = msg.username;
    var password = msg.password;
    var sessionService = self.app.get('sessionService');

    //SPLIT FULLNAME TO FIRST NAME AND LAST NAME
    var nameSeparationIndex = fullname.indexOf(' ');
    var firstname;
    var lastname;

    if (nameSeparationIndex==-1)
    {
        firstname = fullname;
        lastname = "";
    }
    else
    {
        firstname = fullname.substr(0,nameSeparationIndex);
        lastname = fullname.substr(nameSeparationIndex+1);
    }


    console.warn("First name:" + firstname);
    console.warn("Last name:" + lastname);


    //VALIDATE USERNAME
    var isUsernameValid = username.search(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/);
                                                                              //allowed characters
                                                                 //no __ or _. or ._ or .. inside
                                                         //no _ or . at the beginning
                                             //username is 4-20 characters long
    if (isUsernameValid==-1)
    {
        console.warn("Username Invalid: " + username);
        next(null, {code: "usernameinvalid"});
        return;
    }


    //KEY VALIDATION
    key = key.replace(/-/g, "");
    var keyValid=false;

    if (key.length==16)
    {
        var key1 = key.substr(0,8);
        var key2 = key.substr(8);

        var key1int = crc.crc32(key1) >>>0;
        var key1crc = pad(key1int.toString(16),8);

        //console.warn("Comparing calculated: " + key2.toLowerCase() + ", with given: " + key1crc.toLowerCase());

        if (key2.toLowerCase()==key1crc.toLowerCase())
            keyValid=true;
    }



    if (keyValid)
    {
        console.warn("Key Valid for: " + fullname + ", " + email);

        //Search if key exists, then if user exists, then if email exists
        database.checkUser(username, email, key,
        function (code) {
            if (code=="clear") {
                var raw_User = { firstName: firstname, lastName: lastname, email: email, key: key, name: username, password: password };

                //Create User
                database.create(database.User, raw_User,
                    function (err, objCreated_User) {
                        if (err) {next(null, {code: "error"}); return console.error(err);}

                        //Create Developer
                        var raw_Developer = { isTeam: false, user: objCreated_User._id, tags: [] };
                        database.create(database.Developer, raw_Developer,
                            function (err, objCreated_Developer) {
                                if (err) {next(null, {code: "error"}); return console.error(err);}

                                //Update User
                                objCreated_User.developerReference= objCreated_Developer._id;

                                objCreated_User.save(function (err) {
                                    if (err) {next(null, {code: "error"}); return console.error(err);}

                                    //Done!
                                    next(null, {code: "success"});
                                });
                            });
                    });
            }
            else next(null, {code: code});
        });
    }
    else
    {
        console.warn("Key invalid for: " + fullname + ", " + email);
        next(null, {code: "keyinvalid"});
    }
};