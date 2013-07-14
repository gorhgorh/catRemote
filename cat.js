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
var five = require("johnny-five"),  // johnny-five, enable us to talk to sir arduino
    board = new five.Board(),       // initialise a board instance that will contain instance of our hardware
    servo,
    servoY,
    laser,
    onlineLed,
    socket,
    client = require('socket.io-client'),
    servInfo = 'http://192.168.2.191:4000/',
    //servInfo = 'http://192.168.2.191:4000/',
    boardState
    ;

// borad initialisation
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
    boardState = "groovy"; // the board is available (used to prevent move order before init)
});

// arduino <---> socket.

// arduino, meet the socke.io server
socket = client.connect(servInfo);
// the server tell me something
socket.on('message', function (e) {

    // check if the message is a rotation value
    // then move the servo if it is one.
    // the page send a value between 0 and 1
    // so we multiply it by 170 to get a 0 to 170° angle

    if(e.sliderX && e.sliderY){
        servoX.move(Math.floor(e.sliderX *170));
        servoY.move(Math.floor(e.sliderY *170));
    }
    // or a web client incoming in the io server
    else if(e.client === "web"){
        onlineLed.on(); // it lights the online led
        console.log(e.client);
    }

    // TODO : create "briquet" and "mouvements" as libs to show module includes
    // or a light switch
    else if(e.noduinoEvent === 'ledSwitchAction'){
        //briquet.ledSwitch();
    }
    else if(e.noduinoEvent === 'ledStrobeAction'){
        //briquet.ledPulse();
    }
    // or a mouvement
    else if(e.noduinoEvent === 'headNoAction'){
        //mouvements.headNo();
    }
    // or a CAMERA INPUT, not sure i'll have time to hack that but in case ...
    // else if(e.camVal){
    //     /*
    //         the cam stage is 320/240 0.0 is on the upper left corner
    //         i converted input in % and multiplied for a 170° angle
    //     */
    //     if (controlled === false){
    //         splitVal(e.camVal);
    //         //console.log(cervoX);
    //         if (boardState == "groovy"){
    //             //console.log(cervoX + " : " + cervoY);
    //             servo.move(cervoX);
    //             servoY.move(cervoY);
    //             //console.log(cervoX + "° : " + cervoY + "°");
    //         }
    //     }

    // }

    // or a controll input
    else if (e.noduinoEvent === 'controlled'){
        controlled=true;
        console.log(controlled);
        console.log(e);
    }
    else if (e.noduinoEvent === 'notControlled'){
        controlled=false;
        console.log(controlled);
        console.log(e);
    }
    // step recorder not implemented yet
    // else if (e.recStep){
    //     splitVal(e.recStep);
    //     if (boardState == "groovy"){
    //         //console.log(cervoX + " : " + cervoY);
    //         servo.move(cervoX);
    //         servoY.move(cervoY);
    //         //console.log(cervoX + "° : " + cervoY + "°");
    //     }
    // }

    // or log it
    else{
        console.log(e);
    }

});
