// script to get postion to send to our cat laser tower

var board = require('../../../boardController.js');

window.onload = function() {
    'use strict';

    var serverUrl="http://localhost:4000/";
    var env = "dev",
        servInfo = (env === "prod")?'http://intense-basin-8769.herokuapp.com/':serverUrl,
        messages = [],
        socket = io.connect(servInfo),

        // cached selectors
        ledSwitchBt = document.getElementById('ledSwitchBt'),
        ledStrobeBt = document.getElementById('ledStrobeBt'),
        headNoBt    = document.getElementById('headNoBt'),

        // positions
        slideX,
        slideY,
        sceneX = 598, // w/h of the web client controll boundries
        sceneY = 378;

    console.log("connection to : " + servInfo);

    // draggable widjet (simple jqui one)
    // dragable zone dimention 598*378px
    // send the position to the socket.io server
    $( "#pointer" ).draggable({
        containment: "#pointerCont", // constaining
        scroll: false,

        drag: function (ev, ui) {
            var position = ui.position;
            var posX = scale(sceneX,position.left);
            var posY = scale(sceneY,position.top);
            socket.emit("send", {
              action: board.defs.ACTION_LOOKAT,
              params: [posX, posY]
            });
        }
    });

    // say hello when connecting
    socket.on('connect', function () {
        socket.emit('send', { 
          action: board.defs.ACTION_ACTIVATE,
          params: true
        });
    });
    // receving message from the server
    socket.on('message', function (e) {
        // if it is a message it goes to the log
        if(e.message) {
            messages.push(e);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        // if it is a noduinoEvent it goes to the robot
        } else if (e.noduinoEvent){
            console.log(e.noduinoEvent);
        }
        console.log(e);
    });

    io.sockets.on('connection', function (socket) {
    count++;
    io.sockets.emit('count', {
        number: count
    });

    socket.on('disconnect', function () {
        console.log('DISCONNESSO!!! ');
        count--;
        io.sockets.emit('count', {
            number: count
        });
    });
});

    // sending message
    ledSwitchBt.onclick = function() {
        socket.emit('send', {
              action: board.defs.ACTION_SWITCH,
              params: []
            });
    };
    ledStrobeBt.onclick = function() {
        socket.emit('send', {
              action: board.defs.ACTION_PULSE,
              params: []
            });
    };
    headNoBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "headNoAction"});
    };

};

// convert position info in a 0 to 1 int so we can use a 
// normalized value with differents actuators
function scale (maxVal, val) {
    return val / maxVal;
}
