var net = 		require('net'),
HOST = 			"127.0.0.1",
PORT =			"4666"
client =		new net.Socket();
client.connect(PORT,HOST, function  () {
	console.log("CONNECTED TO THE BLODDY SERVER @: " + HOST + ":" + PORT);
	client.write("0123456789")
});
client.on('data', function (data) {
	console.log("DATA" + data);
})