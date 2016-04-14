var dispatcher = require('../../../util/dispatcher');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
	this.channelService = app.get('channelService');
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.saySomething = function(msg, session, next) {
	var uid = msg.uid;
	if(!uid) {
		next(null, {
			code: 500
		});
		return;
	}
	// get all connectors
	var connectors = this.app.getServersByType('connector');
	if(!connectors || connectors.length === 0) {
		next(null, {
			code: 500
		});
		return;
	}
	// select connector
	var res = dispatcher.dispatch(uid, connectors);
	next(null, {
		code: 200,
		host: res.host,
		port: res.clientPort
	});
};

//self.app.rpc.chat.chatRemote.add(session, uid, self.app.get('serverId'), "mainRoom", true, function(users){
//ChatRemote.prototype.add = function(uid, sid, name, flag, cb) {

handler.enter = function(msg, session, next) {
	var sessionService = self.app.get('sessionService');
	var l_uid = msg.uid;
	var l_sid = self.app.get('serverId');
	var l_username = msg.username;
	var l_roomName = "mainRoom";
	session.bind(l_uid);

	session.set('uid', l_uid);
	session.push('uid', function(err) {
		if(err) {
			console.error('set uid for session service failed! error is : %j', err.stack);
		}
	});

	//session.on('closed', onUserLeave.bind(null, self.app));

	var channel = this.channelService.getChannel(l_roomName, true);
	var param = {
		route: 'onAdd',
		user: l_username
	};
	channel.pushMessage('onAdd', param);

	if( !! channel) {
		channel.add(l_uid, l_sid);
	}


	next(null, {
		code: "success"
	});
};