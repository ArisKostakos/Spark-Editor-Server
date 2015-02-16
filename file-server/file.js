/**
 * Created by Aris on 2/14/2015.
 */

var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs-extra');
var path = require('path');


var publicPath = path.resolve("../web-server/public");
var assetsPath = publicPath + '/assets';

console.warn("File Server listening on: 3001");

var server = BinaryServer({port: 3001});

server.on('connection', function(client){
    console.warn("Somebody connected, yeahhh");

    client.on('stream', function(stream, meta){
        //
        console.warn("FILE SEND REQUEST RECEIVED: Name ["+ meta.name + "] and size [" + meta.size + "]");
        //
        var file = fs.createWriteStream(assetsPath + '/' + meta.name);
        stream.pipe(file);
        //
        // Send progress back
        stream.on('data', function(data){
            console.warn("SENDING PROGRESS BACK: data.length ["+ data.length + "] and meta.size [" + meta.size + "] and rx ["+ data.length / meta.size + "]");
            stream.write({rx: data.length / meta.size, length: data.length});
        });
    });
});