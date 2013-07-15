// this is the socket.io server that will be used to send data
// to the bot, it will also serve static html pages
// for the tutorial part.

// standard express server + socket.io on port:4000
var express = require("express");
var app = express();
var http = require('http');
var server = http.createServer(app);
var port = process.env.PORT || 4000; // listen to heroku's port or 4000
var io = require('socket.io').listen(
    app.listen(port,function() {
        console.log("Listening on " + port);
        }
    ));
var count = 0;
// used for unity launch a tcp server at port 5000
var tcpPort = require('./lib/unityPort');
tcpPort();

// reduced log )
io.set('log level', 1);
    
app.use(express.logger());

// Public files
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.get('/help', function (req, res) {
  res.sendfile(__dirname + '/public/help/index.html');
});

// socket.io init
io.sockets.on('connection', function (socket) {
    count++;
    console.log(count);
    // say hello
    socket.emit('message', { message: 'you are connected to the socket.io server, sir' });
    // events
    // messages
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    // value from the webpage's slider
    socket.on('sliderVal', function (data) {
        io.sockets.emit('message', data);
    // value from the camera
    });
    socket.on('camVal', function (data) {
        io.sockets.emit('message', data);
    });
    socket.on('recStep', function (data) {
        io.sockets.emit('message', data);
    });

    socket.on('disconnect', function () {
        console.log('diconnected!!! ');
        count--;
        console.log(count);
    });

});
