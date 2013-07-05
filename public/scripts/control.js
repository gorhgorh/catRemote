// script to get postion to send to our cat laser tower

// draggable widjet (simple jqui one)
// store the position and the initial pos (inertia, if we time clicks ?)
$( "#pointer" ).draggable({
    containment: "#pointerCont", // constaining
    scroll: false,
    stop: function(ev, ui){
        var position = ui.position;
        var originalPosition = ui.originalPosition;
        console.log(position);
    }
});


window.onload = function() {
    'use strict';

    var env = "dev",
        servInfo;

    if (env === "prod"){
        servInfo = 'http://intense-basin-8769.herokuapp.com/';
    }
    else{
        servInfo = "http://localhost:4000/";
    }

    var // port = process.env.port,

        messages = [],
        socket = io.connect(servInfo),

        // cached selectors
        ledSwitchBt = document.getElementById('ledSwitchBt'),
        ledStrobeBt = document.getElementById('ledStrobeBt'),
        headNoBt    = document.getElementById('headNoBt'),

        // positions
        slideX,
        slideY;

    console.log("connection to : " + servInfo);

    socket.on('connect', function () {
        console.log("ready to make a cat crazy");
        socket.emit('send', { noduinoEvent: "webClientConnect"});
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
        // if it is a slider it goes to the robot
        } else if (e.noduinoEvent){
            console.log(e.noduinoEvent);
        }
        console.log(e);
    });

    // sending message
    ledSwitchBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "ledSwitchAction"});
        console.log('to');
    };
    ledStrobeBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "ledStrobeAction"});
    };
    headNoBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "headNoAction"});
    };



};
