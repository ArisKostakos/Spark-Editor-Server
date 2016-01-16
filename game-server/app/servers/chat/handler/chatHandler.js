var chatRemote = require('../remote/chatRemote');

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

var handler = Handler.prototype;

/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.sendMessage = function(msg, session) {
	//var rid = session.get('uid');
	//var username = session.uid.split('*')[0];
	var channelService = this.app.get('channelService');
	var user = session.get('user');

	var param = {
		msg: msg.content,
		from: user.name,
		target: msg.target
	};
	channel = channelService.getChannel("mainRoom", false);

	//the target is all users
	if(msg.target == '*') {
		channel.pushMessage('onChat', param);
	}

	console.warn('Done sending message: ' + msg.content);
	console.warn('From: ' + user.name);
	/*
	//the target is specific user
	else {
		var tuid = msg.target + '*' + rid;
		var tsid = channel.getMember(tuid)['sid'];
		channelService.pushMessageByUids('onChat', param, [{
			uid: tuid,
			sid: tsid
		}]);
	}
	*/

	//This is a notify.. no response..
	/*
	next(null, {
		route: msg.route
	});
	*/
};