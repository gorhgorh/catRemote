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
// kudos to johnny-five and all those who gave us control
// over mater with javacript


// this file is the robot itself, or its mind, you decide,
// and it is javascript all the way.

// variables
var five = require("johnny-five"),  // johnny-five, enable us to talk to sir arduino
    board = new five.Board(),       // initialise a board instance that will contain instance of our hardware
    onlineLed;                      // our little led

// borad initialisation
board.on("ready", function() {      // remember jquery ?

    // in this section we will create instances for our led
    onlineLed = new five.Led(13);     // a led to test the board

    // inject our hardware in the Repl, so we can talk with
    // then in the command line
    board.repl.inject({
        onlineLed: onlineLed
    });
});
