// script to get postion to send to our cat laser tower

window.onload = function() {
    'use strict';

    var serverUrl="http://localhost:4000/";
    //var serverUrl="http://192.168.2.191:4000/"
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
                sliderX: posX,
                sliderY: posY
            });
        }
    });

    // say hello when connecting
    socket.on('connect', function () {
        socket.emit('send', { noduinoEvent: "webClientConnect", client : "web"});
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

    // sending message
    ledSwitchBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "ledSwitchAction"});
    };
    ledStrobeBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "ledStrobeAction"});
    };
    headNoBt.onclick = function() {
        socket.emit('send', { noduinoEvent : "headNoAction"});
    };

};

// convert position info in a 0 to 1 int so we can use the
function scale (maxVal, val) {
    return val / maxVal;
}
