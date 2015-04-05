module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};

var remote = Remote.prototype;

remote.copy = function(asset, cb) {

	console.log('Found Recursively Rpc: ' + asset.name);
	cb(null);
};
