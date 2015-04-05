module.exports = function(app) {
	return new CreateRemote(app);
};

var CreateRemote = function(app) {
	this.app = app;
	this.channelService = app.get('channelService');
};


CreateRemote.prototype.copy = function(asset, cb) {

	console.log('Found Recursively Rpc: ' + asset.name);
	cb(null);
};
