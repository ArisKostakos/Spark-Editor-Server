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

remote.copy = function(asset, oldProjectName, user, developer, newProjectName, cb) {
	//Asset Path
	var assetPath = path.resolve("../web-server/public") + '/assets';

	var assetSource = assetPath + '/' + asset.owner.user.name + '/' + asset.type + '/' + asset.dir + '/' + asset.fileName + '.' + asset.fileExtension;

	fs.ensureDirSync(assetPath + '/' + user.name + '/' + asset.type + '/' + asset.dir.replace(oldProjectName,newProjectName));
	var assetTarget = assetPath + '/' + user.name + '/' + asset.type + '/' + asset.dir.replace(oldProjectName,newProjectName) + '/' + asset.fileName + '.' + asset.fileExtension;

	console.log('Found Recursively Rpc: ' + asset.name);
	console.log('assetSource: ' + assetSource);
	console.log('assetTarget: ' + assetTarget);


	fs.readFile(assetSource, 'utf8', function (err, data) {
		//Handle Error
		if (err) {
			cb(err);
			return;
		}

		//Success
		var result = data.replace(new RegExp(oldProjectName+'.',"g"), newProjectName+'.');

		fs.writeFile(assetSource, result, 'utf8', function (err) {
			//Handle Error
			if (err) {
				cb(err);
				return;
			}

			//Success
			//copy assetFile to /user location
			fs.copy(assetSource, assetTarget, function(err) {
				//Handle Error
				if (err) {
					cb(err);
					return;
				}

				//create new assetDB for each assetDB (mark as fork)
				var raw_Asset = {name: asset.name.replace(oldProjectName,newProjectName), fork: asset._id, owner: developer._id, type: asset.type, dir: asset.dir.replace(oldProjectName,newProjectName), fileName: asset.fileName, fileExtension: asset.fileExtension, title: asset.title, fileSize: asset.fileSize, componentType: asset.componentType, tags: [newProjectName], accessControl: [], assetDependancies: []};

				//Create Asset
				database.create(database.Asset, raw_Asset,
				function (err, objCreated_Asset) {
					//Handle Error
					if (err) {
						cb(err);
						return;
					}

					//Send Success Signal
					cb(null);
				});
			});
		});
	});
};
