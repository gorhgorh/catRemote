assert = require('assert');

var briquet = {
    checkValid: function(ledObj) {
      assert(ledObj.state.blink);
    }
  
    ledOn : function(ledObj) {
      checkValid(ledObj);
      ledObj.on();
    },
    ledOff : function(ledObj) {
      checkValid(ledObj);
      ledObj.off();
    },
    ledSwitch: function(ledObj) {
      checkValid(ledObj);
      if (ledObj.blink.state === false) {
          ledObj.on();
          ledObj.blink.state = true;
      } else {
          ledsObj.off();
          ledObj.blink.state = false;
      }
    },
    ledPulse : function(ledObj) {
      checkValid(ledObj);
      ledObj.strobe( 500 );
      console.log("pulse on");
      // Turn off the led pulse loop after 1 seconds (shown in ms)

      board.wait( 5000, function() {
          ledObj.stop().off();
          console.log("pulse off");
      });
    }
};

module.exports = briquet;