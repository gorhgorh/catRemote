var ngSplit=function (angle,nbrServo,minMax,servoAngle) {
    // if no angle is provided, error   
    if(angle===undefined){
        console.log("ERROR : bad mojooo, angle, my dear you should provide")
        return new Error('you should provide at least the angle ');
    }
    else{
        // defaulting values
        if(nbrServo===undefined){
            nbrServo=2;
        }
        if(minMax===undefined){
            minMax=[40,320];
        }
        if(servoAngle===undefined){
            servoAngle=180;
        }

        console.log("angle " + angle +"°");
        console.log("nbrServo " + nbrServo);
        console.log("minMax " + minMax[0] + ' / ' + minMax[1]);
        console.log("servoAngle " + servoAngle +"°");
           
    }
}

module.exports = ngSplit;