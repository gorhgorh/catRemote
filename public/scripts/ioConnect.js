var env = "dev",
    servInfo = (env === "prod")?'http://intense-basin-8769.herokuapp.com/':serverUrl,
    messages = [],
    serverUrl="http://localhost:4000/",
    socket = io.connect(servInfo);

console.log("connection to : " + servInfo);

// draggable widjet (simple jqui one)
// dragable zone dimention 598*378px
// send the position to the socket.io server

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
    else if (e.sliderY){
        socket.emit("send", {
            sliderX: posX,
            sliderY: posY
        });
    }
    console.log(e);
});
