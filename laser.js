var five = require('johnny-five'),  // johnny-five, enable us to talk to sir arduino
    util = require('util'),
    briquet = require('./lib/briquet.js'),   // configuration file, sharded with the server
    board = new five.Board({
        port: "/dev/cu.usbmodem1411"
    }), 
    laser;

board.on('ready', function() {
    laser     = createLaser(13);
    board.repl.inject({
        laser:laser
    });
});

// factory function to add a on/off state
function createLaser(pin) {
    var laser = new five.Led(pin);
    laser.blink = { state:false };
    return laser;
}