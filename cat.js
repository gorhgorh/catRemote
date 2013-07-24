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

var assert = require('assert');

var config = require('./config'),   // configuration file, sharded with the server
    client = require('socket.io-client'), // socket.io client to recive order from the server
    servInfo = config.servInfo.url+':'+config.servInfo.port;



var board = require('./boardController');
var boardInstance = board();
console.log(boardInstance.laser);
// arduino <---> socket.

// arduino, meet the socke.io server
var socket = client.connect(servInfo);
// the server tell me something
socket.on('message', function(msg) {
  
  // just send the message to the board
  //assert(msg.action); 
  //assert(msg.params);
  //board.safeExecute(msg.action, msg.params);
   

  // or log it
  if (config.cat.eventLog!==false){
      console.log(msg);
  }

});
