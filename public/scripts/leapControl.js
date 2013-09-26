// script to get postion to send to our cat laser tower
var previousFrame;
var paused = false;
var pauseOnGesture = false;
var i=0;


// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
    if (paused) {
        return; // Skip this update
    }

    i++;
    // track only 40frame/s
    if (i%3 === 0) {
        console.log('frame');
        if (frame.hands.length > 0){
        
            posX = scaleX(frame.hands[0].palmPosition[0],300);
            posY = scaleY(frame.hands[0].palmPosition[1],300);
            console.log (posX + '/' + posY);

            //console.log(frame.hands[0].palmPosition[1]);
            // if (posX >= 1) {
            //     posX = 1;
            // }
            // else if (posX <= 0) {
            //     posX = 0;
            // }
            // if (posY >= 1) {
            //     posY = 1;
            // }
            // else if (posY <= 0) {
            //     posY = 0;
            // }

            // socket.emit("send", {
            //     sliderX: posX,
            //     sliderY: posY
            // });
    }
        i=0;
        //console.log ("cycle")
    }
    //console.log (i);
    

    function togglePause() {
        paused = !paused;

        if (paused) {
            document.getElementById("pause").innerText = "Resume";
        } else {
            document.getElementById("pause").innerText = "Pause";
        }
    }

    function pauseForGestures() {
        if (document.getElementById("pauseOnGesture").checked) {
            pauseOnGesture = true;
        } else {
            pauseOnGesture = false;
        }
    }


    // convert position info in a 0 to 1 int so we can use a 
    // normalized value with differents actuators
    function scaleX(val, valMax) {
        return (val + valMax) / valMax * 2;
    }
    function scaleY(val, valMax) {
        return val /valMax ;
    }
    
        
});
