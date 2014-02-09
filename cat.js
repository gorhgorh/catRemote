// _________         __
// \_   ___ \_____ _/  |_
// /    \  \/\__  \\   __\
// \     \____/ __ \|  |
//  \______  (____  /__|
//         \/     \/
//                                __
// _______   ____   _____   _____/  |_  ____
// \_  __ \_/ __ \ /     \ /  _ \   __\/ __ \
//  |  | \/\  ___/|  Y Y  (  <_> )  | \  ___/
//  |__|    \___  >__|_|  /\____/|__|  \___  >
//              \/      \/                 \/
//                      __         .__
//   ____  ____   _____/  |_  ____ |  |
// _/ ___\/  _ \ /    \   __\/  _ \|  |
// \  \__(  <_> )   |  \  | (  <_> )  |_
//  \___  >____/|___|  /__|  \____/|____/
//      \/           \/
//
//
//
// kudos to johnny-five


// this file is the robot itself, or its mind, you decide,
// and it is javascript all the way.

// variables

var five = require('johnny-five'),  // johnny-five, enable us to talk to sir arduino
    util = require('util'),
    briquet = require('./lib/briquet.js'),   // configuration file, sharded with the server
    board = new five.Board({
        port: "/dev/cu.usbmodem1411"
    }), 

          // initialise a board instance that will contain instance of our hardware
    servoX, // this will be the link with the X axis
    servoY,
    laser, // self explanatory
    onlineLed,
    socket,
    client = require('socket.io-client'),
    servInfo = "http://localhost:4000",
    yVal=0;

// board initialisation
board.on('ready', function() {

    // in this section we will create instances for our hardware
    // This example allows the button module to
    // create a completely default instance
    laser     = createLaser(12);     // cat mesmeriser created by a factory function to add an initial state
    onlineLed = new five.Led(13);     // a led to test the board
    servoX    = new five.Servo(10);   // servo for the X axis
    servoY    = new five.Servo(9);  // servo for the Y axis
    servoY2    = new five.Servo(11); 

    // inject our hardware in the Repl, so we can talk with
    // then in the command line
    board.repl.inject({
        servoX:servoX,
        servoY:servoY,
        servoY2:servoY2,
        laser:laser,
        onlineLed: onlineLed
    });

    var moveServoX = function (x) {
        servoX.move(Math.floor(x *180));
    };

    var moveServosY = function (y) {
        yVal=y *320;
        if (yVal<45){
            servoY.move(50);
            servoY2.move(90+(yVal-50));
        }
        else if(yVal>125){
            servoY.move(110);
            servoY2.move(90+(yVal -110));
        }
        else{
            servoY.move(Math.floor(yVal));
        }
    };

    moveServos(e.sliderX, e.sliderY, moveServoX, moveServosY);

    console.log(servInfo);
    // center the bot
    servoX.center();
    servoY.center();
    servoY2.center();
    laser.on();
    
});

// arduino <---> socket.



var moveServos = function (sliderX, sliderY, moveServoX, moveServosY) {
    if(true){
        moveServoX(sliderX);
        moveServosY(sliderY);
    }
};

module.exports = moveServos;



// arduino, meet the socke.io server
var socket = client.connect(servInfo);

// the server tell me something
socket.on('message', function (e) {

    // check if the message is a rotation value
    // then move the servo if it is one.
    // the page send a value between 0 and 1
    // so we multiply it by the desired axis angle
    

    // // or a web client incoming in the io server
    // else if(e.client === "web"){
    //     //onlineLed.on(); // it lights the online led
    //     console.log(e.client);
    // }

    // else if(e.client === "webOff"){
    //     //onlineLed.off(); // it shut down the online led
    //     console.log("webclient is off");
    // }

    // // or a light switch
    // else if(e.noduinoEvent === 'ledSwitchAction'){
    //     briquet.ledSwitch(laser);
    // }

});

// factory function to add a on/off state
function createLaser(pin) {
    var laser = new five.Led(pin);
    laser.blink = { state:false };
    return laser;
}

// function to handle more the 180° Y move 
//vektorY
//           \`*-.                    
//            )  _`-.                 
//           .  : `. .                
//           : _   '  \               
//           ; *` _.   `*-._          
//           `-.-'          `-.       
//             ;       `       `.     
//             :.       .        \    
//             . \  .   :   .-'   .   
//             '  `+.;  ;  '      :   
//             :  '  |    ;       ;-. 
//             ; '   : :`-:     _.`* ;
//          .*' /  .*' ; .*`- +'  `*' 
// .        `*-*   `*-*  `*-*'        