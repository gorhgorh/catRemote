function tcpPort(port,servInformation) {
    // Load the TCP Library, socket .io, and set a few variables
    var net = require('net'),
    clientIo = require('socket.io-client'),
    socketYo = clientIo.connect(servInformation),
    clients = [];

    // Start a TCP Server
    net.createServer(function (socket) {
        // log errors
        process.on('uncaughtException', function (err) {
            console.log('Caught exception: ' + err);
        });
        // Identify this client
        socket.name = socket.remoteAddress + ":" + socket.remotePort;

        // Put this new client in the list
        clients.push(socket);

        // Send a nice welcome message and announce
        socket.write("Welcome " + socket.name + "\n");
        broadcast(socket.name + " this TCP client just connected", socket);

        // Handle incoming infos from clients.
        socket.on('data', function (data) {
            broadcast(socket.name + "> " + data, socket);
        });

        // Remove the client from the list when it leaves
        socket.on('end', function () {
            clients.splice(clients.indexOf(socket), 1);
            broadcast(socket.name + " : this TCP client left the server");
        });

        // Send a message to all clients
        function broadcast(message, sender) {
            clients.forEach(function (client) {
            // Don't want to send it to sender
            if (client === sender) return;
                client.write(message);
            });
            // Log it to the server output too
            //process.stdout.write(message + "\n");
            yoMsg(message);
        }


        function yoMsg(msg){

            var splits = msg.split("@");
            //console.log(splits);
            //console.log(typeof(splits[1]));
            // pattern = /\((.+?)\)/g,
            // match,
            // matches = [];

            // while (match = pattern.exec(string)) {
            // matches.push(match[1]);
            // }
            // if there is a value that match the split > socket.io server
            socketYo.emit("send", {
                sliderX: splits[1],
                sliderY: splits[2]
            });
            //console.log("splitX" + splits[1] + "splitY" + splits[2]);

        }

        socketYo.emit('send', { message: "i m here", username: "socket master" });
        process.stdout.write("TCP client listener running at port "+port+"\n rerouting event to the socket.io server");
        process.stdout.write("tcpSocketport = " + port);


    }).listen(port);

}

module.exports = tcpPort;