var briquet={
    ledOn : function(ledObj) {
        ledObj.on();
    },
    ledOff : function(ledObj) {
        ledObj.off();
    },
    ledSwitch: function(ledObj) {
        if (ledObj.blink.state === false) {
            ledObj.on();
            ledObj.blink.state = true;
        } else {
            ledObj.off();
            ledObj.blink.state = false;
        }
    }
};

module.exports = briquet;