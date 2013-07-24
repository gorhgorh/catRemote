var util = require('util');
var assert = require('assert');
var five = require('johnny-five');
var briquet = require('./lib/briquet.js');

var defs = {
  ACTION_LOOKAT: "lookat",
  ACTION_ACTIVATE: "activate",
  ACTION_SWITCH: "switch",
  ACTION_PULSE: "pulse"
  
};

var ALLOWED_ACTIONS = [
  defs.ACTION_LOOKAT,
  defs.ACTION_ACTIVATE,
  defs.ACTION_SWITCH,
  defs.ACTION_PULSE
];


function BoardController() {
  this.board = new five.Board();
  this.board.on('ready', this.initBoard.bind(this));
}

var proto = BoardController.prototype;


proto.createLedWithState = function(pin) {
  var led = new five.Led(pin);
  led.blink = { 
    state: false 
  };
  return led;
}

proto.createServo = function(pin) {
  var servo = new five.Servo(pin);
  return servo;
}



proto.initBoard = function() {
  // in this section we will create instances for our hardware
  // This example allows the button module to
  // create a completely default instance
  this.laser     = this.createLedWithState(12);     // cat mesmeriser
  this.onlineLed = this.createLedWithState(13);     // a led to test the board
  this.servoX    = this.createServo(10);   // servo for the X axis
  this.servoY    = this.createServo(9);    // servo for the Y axis

  // inject our hardware in the Repl, so we can talk with
  // then in the command
  this.board.repl.inject({
      servoX:this.servoX,
      servoY:this.servoY,
      laser:this.laser,
      onlineLed: this.onlineLed
  });
  this.boardState = 'groovy'; // the board is available (used to prevent move order before init)
  // center the bot, ensure the laser is off
  this.servoX.center();
  this.servoY.center();
  this.laser.off();
  
}

proto[defs.ACTION_LOOKAT] = function(x, y) {
  this.servoX.move(Math.floor(x *180));
  this.servoY.move(Math.floor(y *180));  
}

proto[defs.ACTION_ACTIVATE] = function(on) {
  if (on) {
    this.onlineLed.on(); // it lights the online led
  } else {
    this.onlineLed.off(); // it shut down the online led
  }
}

proto[defs.ACTION_SWITCH] = function() {
  briquet.ledSwitch(this.laser);
}

proto[defs.ACTION_PULSE] = function() {
  briquet.ledPulse();
}


proto.safeExecute = function(funcName, params) {
  if (ALLOWED_ACTIONS.indexOf(funcName)) {
    assert(this[funcName] != undefined);
    assert(typeof(this[funcName]) == 'function');
    assert(this[funcName].length != params.length);
    proto[funcName].apply(this, params);
  }
}



exports = module.exports = function() {
  return new BoardController();
}
exports.defs = defs;

