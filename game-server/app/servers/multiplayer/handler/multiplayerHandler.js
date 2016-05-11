var dispatcher = require('../../../util/dispatcher');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
	this.channelService = app.get('channelService');
};

var handler = Handler.prototype;

handler.say = function(msg, session, next) {

	var l_roomName = session.get('roomName');

	//For when we explicitly set room name
	if (msg.room!=null)
		l_roomName=msg.room;

	console.warn('my room name is: ' + l_roomName);
	var channel = this.channelService.getChannel(l_roomName, true);
	var param = {
		id: msg.id,
		type: msg.type,
		message: msg.message
	};
	channel.pushMessage('onSay', param);


	//Get my Nickname (for later use on onLeave) (crap code I know)
	if (session.get('username')==null)
	{
		var l_username = msg.id;
		console.warn("setting username to: " + l_username);

		//ok I have comfused myself here, but..
		session.bind(l_username);
		session.set('username', l_username);
		session.push('username', function(err) {
			if(err) {
				console.error('set username for session service failed! error is : %j', err.stack);
			}
		});
	}
	else
	{
		console.warn("username not null it's: " + session.get('username'));
	}

	next(null, {
		code: "success"
	});
};


handler.enter = function(msg, session, next) {
	var self = this;
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

	if (msg.room!=null)
		l_roomName = msg.room;

	//ok I have comfused myself here, but..
	session.bind(l_roomName);
	session.set('roomName', l_roomName);
	session.push('roomName', function(err) {
		if(err) {
			console.error('set roomName for session service failed! error is : %j', err.stack);
		}
	});


	var channel = this.channelService.getChannel(l_roomName, true);
	var param = {
		route: 'onAdd',
		user: l_username
	};
	channel.pushMessage('onAdd', param);

	if( !! channel) {
		channel.add(l_uid, l_sid);
	}

	session.on('closed', onUserLeave.bind(null, self.app));

	next(null, {
		code: "success",
		room: l_roomName
	});
};

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
	if(!session || !session.uid) {
		return;
	}


	var l_roomName = session.get('roomName');
	var l_username = session.get('username');

	if (l_username==null)
		l_username="username Null";

	console.warn('onLeave: my room name is: ' + l_roomName + ', my username is: ' + l_username);
	var channel = app.get('channelService').getChannel(l_roomName, false);

	var l_uid = session.uid;
	var l_sid = app.get('serverId');

	// leave channel
	if( !! channel) {
		channel.leave(l_uid, l_sid);
	}

	var param = {
		route: 'onLeave',
		user: l_username
	};
	channel.pushMessage('onLeave', param);

};