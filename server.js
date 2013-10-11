// this is the socket.io server that will be used to send data
// to the bot, it will also serve static html pages

// variables definition
var express = require("express"),
    app = express(),
    config = {},
    http = require('http'),
    servInfo = "localhost:4000",
    server = http.createServer(app),
    port = 4000,
    io = require('socket.io').listen(
    app.listen(port,function() {
        console.log("Listening on " + port);
        }
    )),
    count = 0;

// configuration 
config.servInfo = {};
config.servInfo.url = 'http://localhost';
config.servInfo.port = process.env.PORT || 4000;
config.servInfo.tcpServer = false;
config.servInfo.tcpServerPort = 4600;
    
config.cat = {};
config.cat.eventLog = true;




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

        socket.emit('send', { noduinoEvent: "webClientConnect", client : "webOff"});
    });

});
