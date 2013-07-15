var net = 		require('net'),
HOST = 			"127.0.0.1",
PORT =			"5000"
client =		new net.Socket();
client.connect(PORT,HOST, function  () {
	console.log("CONNECTED TO THE BLODDY SERVER @: " + HOST + ":" + PORT);
	client.write("i'm kenshiro, and you can't beat me")
});
client.on('data', function (data) {
	console.log("DATA" + data);
})