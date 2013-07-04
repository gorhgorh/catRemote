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


var five = require("johnny-five"),  // johnny-five, enable us to talk to sir arduino
    board = new five.Board(),       // initialise a board instance that will contain instance of our hardware
    servo,
    servoY,
    laser,
    onlineLed;

//
board.on("ready", function() {

    // in this section we will create instances for our hardware
    // This example allows the button module to
    // create a completely default instance
    laser     = new five.Led(12);     // cat mesmeriser
    onlineLed = new five.Led(13);     // a led to test the board
    servoX    = new five.Servo(10);   // servo for the X axis
    servoY    = new five.Servo(9);    // servo for the Y axis

    // inject our hardware in the Repl, so we can talk with
    // then in the command
    board.repl.inject({
        servoX:servoX,
        servoY:servoY,
        laser:laser,
        onlineLed: onlineLed
    });

});

