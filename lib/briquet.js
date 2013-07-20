briquet={
    ledOn : function(argument) {
        headledLed.on();
    },
    ledOff : function(argument) {
        headledLed.off();
    },
    ledSwitch: function() {
        if (blink === false) {
            briquet.ledOn();
            blink = true;
        } else {
            briquet.ledOff();
            blink = false;
        }
    },
    ledPulse : function(argument) {
        headledLed.strobe( 500 );
        console.log("pulse on");
        // Turn off the led pulse loop after 1 seconds (shown in ms)

        board.wait( 5000, function() {
            headledLed.stop().off();
            console.log("pulse off");
        });
    }
};

module.exports = briquet;