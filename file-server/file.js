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

    client.on('stream', function(stream, meta){
        console.warn("FILE SEND REQUEST RECEIVED: Name ["+ meta.name + "] and size [" + meta.size + "] for user [" + meta.user + meta.dir + "]");

        var userIncomingPath = path.resolve("../web-server/public") + '/assets/' + meta.user + '/incoming/'+meta.dir;

        fs.ensureDirSync(userIncomingPath);

        var file = fs.createWriteStream(userIncomingPath + '/' + meta.name);
        stream.pipe(file);
        //
        // Send progress back
        stream.on('data', function(data){
            stream.write({length: data.length});
        });
    });
});