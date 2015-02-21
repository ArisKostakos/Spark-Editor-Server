var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
var database = require('./app/modules/database');

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'Spark Editor Server');

// app configuration
app.configure('production|development', 'connector', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			heartbeat : 3,
			useDict : true,
			useProtobuf : true
		});
});

app.configure('production|development', 'gate', function(){
	app.set('connectorConfig',
		{
			connector : pomelo.connectors.hybridconnector,
			useProtobuf : true
		});
});

app.configure('production|development', 'registration|lobby|editor', function(){
	//connect to db
	database.init();
});

// app configure
app.configure('production|development', function() {
	// route configures
	app.route('registration', routeUtil.registration);
	app.route('lobby', routeUtil.lobby);
	app.route('chat', routeUtil.chat);
	app.route('editor', routeUtil.editor);

	// filter configures
	app.filter(pomelo.timeout());
});


// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});