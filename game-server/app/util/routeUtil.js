var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if(!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('rid'), chatServers);

	cb(null, res.id);
};

exp.registration = function(session, msg, app, cb) {
	var registrationServers = app.getServersByType('registration');

	if(!registrationServers || registrationServers.length === 0) {
		cb(new Error('can not find registration servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), registrationServers);
	//var res = dispatcher.dispatch("poutsinia", registrationServers);

	cb(null, res.id);
};