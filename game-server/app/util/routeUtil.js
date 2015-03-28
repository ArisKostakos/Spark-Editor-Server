var exp = module.exports;
var dispatcher = require('./dispatcher');

exp.registration = function(session, msg, app, cb) {
	var registrationServers = app.getServersByType('registration');

	if(!registrationServers || registrationServers.length === 0) {
		cb(new Error('can not find registration servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), registrationServers);

	cb(null, res.id);
};

exp.lobby = function(session, msg, app, cb) {
	var lobbyServers = app.getServersByType('lobby');

	if(!lobbyServers || lobbyServers.length === 0) {
		cb(new Error('can not find lobby servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), lobbyServers);

	cb(null, res.id);
};

exp.chat = function(session, msg, app, cb) {
	var chatServers = app.getServersByType('chat');

	if(!chatServers || chatServers.length === 0) {
		cb(new Error('can not find chat servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), chatServers);

	cb(null, res.id);
};

exp.editor = function(session, msg, app, cb) {
	var editorServers = app.getServersByType('editor');

	if(!editorServers || editorServers.length === 0) {
		cb(new Error('can not find editor servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), editorServers);

	cb(null, res.id);
};

exp.assets = function(session, msg, app, cb) {
	var assetsServers = app.getServersByType('assets');

	if(!assetsServers || assetsServers.length === 0) {
		cb(new Error('can not find assets servers.'));
		return;
	}

	var res = dispatcher.dispatch(session.get('uid'), assetsServers);

	cb(null, res.id);
};