function tcpPortServer(port) {
	// Load the TCP Library, socket .io, and set a few variables
	var net = require('net'),
	clientIo = require('socket.io-client'),
	servInfo = 'http://localhost:4000/',
	tcpPort = port || 4666,
	socketYo = clientIo.connect(servInfo),
	intervalID,
	posString,
	clients = [];

	// Start a TCP Server
	net.createServer(function (socket) {

		process.on('uncaughtException', function (err) {
			console.log('Caught exception: ' + err);
		});
		// Identify this client
		socket.name = socket.remoteAddress + ":" + socket.remotePort;

		// Put this new client in the list
		clients.push(socket);

		// Send a nice welcome message and announce
		socket.write("Welcome " + socket.name + "\n");
		broadcast(socket.name + " this processing client just connected", socket);

		// Handle incoming infos from clients.
		socket.on('data', function (data) {
			broadcast(socket.name + "> " + data, socket);
			//posString=data;
		});

		// Remove the client from the list when it leaves
		socket.on('end', function () {
			clients.splice(clients.indexOf(socket), 1);
			broadcast(socket.name + " : this processing client left the server");
		});

		// Send a message to all clients
		function broadcast(message, sender) {
			clients.forEach(function (client) {
			// Don't want to send it to sender
			if (client === sender) return;
				client.write(message);
			});
			// Log it to the server output too
			process.stdout.write(message + "\n");
			yoMsg(message);
		}


		function yoMsg(msg){

			//var splits = msg.split("zyv");
			var string = msg,
			pattern = /\((.+?)\)/g,
			match,
			matches = [];

			while (match = pattern.exec(string)) {
				matches.push(match[1]);
			}
			// if there is a cam value
			if(matches[0] !== undefined){
				// send itsocketYo.emit('camVal', { camVal: matches[0] });
				
			}

			//socketYo.emit('send', { message: splits[1], username: "processingApp" });
		}

		socketYo.emit('send', { message: "i m here", username: "socket master" });
		// Put a friendly message on the terminal of the server.
		//console.log("processing client listener running at port 5000 \n rerouting event to the socket.io server");
		process.stdout.write("processing client listener running at port 5000 \n rerouting event to the socket.io server");
		process.stdout.write("port = " + tcpPort);


	}).listen(5000);

}









module.exports = tcpPortServer;