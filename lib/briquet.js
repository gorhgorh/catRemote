briquet={
    blink:{state:false},
    ledOn : function(ledObj) {
        ledObj.on();
    },
    ledOff : function(ledObj) {
        ledObj.off();
    },
    ledSwitch: function(ledObj) {
        if (briquet.blink.state === false) {
            ledObj.on();
            briquet.blink.state = true;
        } else {
            ledsObj.off();
            briquet.blink.state = false;
        }
    },
    ledPulse : function(ledObj) {
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