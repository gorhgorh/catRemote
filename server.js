// this is the socket.io server that will be used to send data
// to the bot, it will also serve static html pages
// for the tutorial part.

// standard express server + socket.io on the configured port
var express = require("express"),
    app = express(),
    config = require('./config'),
    tcpPort = config.tcpPortServer.port,
    http = require('http'),
    servInfo = config.servInfo.url+':'+config.servInfo.port,
    server = http.createServer(app),
    port = process.env.PORT || config.servInfo.port, // listen to heroku's port or config's port
    io = require('socket.io').listen(
    app.listen(port,function() {
        console.log("Listening on " + port);
        }
    ));
var count = 0;
// used for unity launch a tcp server at port the configured port
if (config.tcpPortServer.launch ===true){
    var tcpPortServer = require('./lib/tcpPortServer');
    tcpPortServer(tcpPort,servInfo);
    console.log("tcpServer On");
}

// reduced log )
io.set('log level', 1);
    
app.use(express.logger());
app.use(express.compress());

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
