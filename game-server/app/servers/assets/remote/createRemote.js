var fs = require('fs-extra');
var path = require('path');
var database = require('../../../modules/database');
var lwip = require('lwip'); //move me to new server for image manipulations..

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
};

var remote = Remote.prototype;

remote.copy = function(asset, username, cb) {
	//copy assetFile to /user location

	//Asset Path
	var assetPath = path.resolve("../web-server/public") + '/assets';

	var assetSource = assetPath + '/' + asset.owner.user.name + '/' + asset.dir + '/' + asset.fileName + '.' + asset.fileExtension;

	var assetTarget = assetPath + '/' + username + '/' + asset.dir + '/' + asset.fileName + '.' + asset.fileExtension;

	console.log('Found Recursively Rpc: ' + asset.name);
	console.log('assetSource: ' + assetSource);
	console.log('assetTarget: ' + assetTarget);

	/*
	//Move Asset File
	fs.copy(assetSource, assetTarget, function(err) {
		if (err) {
			cb(err);
			return;
		}
*/

		//create new assetDB for each assetDB (mark as fork, tag as projectname?, etc)
		cb(null);
	//});
};
