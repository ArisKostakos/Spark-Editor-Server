/**
 * Created by Aris on 2/14/2015.
 */

var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs-extra');
var path = require('path');


console.warn("File Server listening on: 3001");

var server = BinaryServer({port: 3001});

server.on('connection', function(client){
    console.warn("Somebody connected, yeahhh");
});