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

// reduced log )
io.set('log level', 1);

app.use(express.logger());

// Public files
app.use(express.static(__dirname + '/public'));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/help', function (req, res) {
  res.sendfile(__dirname + '/help/index.html');
});
