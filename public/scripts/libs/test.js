//-- GLOBAL VAR --//
var snake = new Array(),
	start = false,
	move = 39,
	last = false,
	bonus = false,
	score = 0,
	scoreNode = document.getElementById('score'),
	play = true,
    inMove = true,
	//config
	speed = 200,
	//head track
	baseX = 0,
	baseY = 0;
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

//-- GLOBAL VAR --//

//-- FUNCTION --//

function startScore(){
	score = score - 3;

	scoreNode.innerHTML = score;

	if(play == true){
		setTimeout(startScore, 500);
	}
}

function popBonus(){//pop un bonus sur la grille

	var random = Math.floor(Math.random() * 1575),
		test = false,
		lent = snake.length; 

	for(var i = 0; i < lent; i++){
		if(snake[i] == random){
			test = true;
			popBonus();
		}
	}	

	if(!test){
		bonus = random;
		var node = document.getElementById('elem_' + random);
		node.style.backgroundColor = '#ff0000';
	}
}


function testSnake(test, old){
	var lent = snake.length;

	if(bonus == test){
		snake[lent] = 1;
		popBonus();

		score = score + 100;

		if(speed > 100){
			speed = speed - 10;
		}
		else if(speed > 50){
			speed = speed - 5;
		}
	}
	else{

		//catch top 	
		if(test < 0 && old < 45 && move == 38){

			snake[0] = old + 1530;

		}//catch bottom
		else if(test > 1574 && old > 1529 && move == 40){

			snake[0] = old - 1530;

		}//catch left
		else if( ((old % 45) == 0) && move == 37){//on catch la colone de gauche
			
			snake[0] = old + 44;

		}//catch right
		else if( (((old-44) % 45) == 0) && move == 39){//on catch la colone de droite
			
			snake[0] = old - 44;

		}

	}

	for(var i = 1; i < lent; i++){
		if(snake[i] == test){
			play = false;
			perdu();
		}
	}
}


function makeSnake(){
	
	var node = document.getElementById('elem_92'),
		node1 = document.getElementById('elem_91');
	node.style.backgroundColor = '#222';
	node1.style.backgroundColor = '#222';

	snake[0] = '92';
	snake[1] = '91';
}

function moveSnake(){

    inMove = true;

	switch(move){
		case 37 : nb = -1; break;
		case 38 : nb = -45; break;
		case 39 : nb = 1; break;
		case 40 : nb = 45; break;
	}

	eraseSnake();

	for(i = 0; i < snake.length; i++){
		if(i == 0){
			var change = parseInt(snake[i]);
			snake[i] = change + nb;

			testSnake(snake[i], change);

			last = change;
		}
		else{
			var change = parseInt(snake[i]);
			snake[i] = last;
			last = change;
		}
	}

	rebuildSnake();

	setTimeout(moveSnake, speed, move);
}


function eraseSnake(){
	var lent = snake.length;
	for(i = 0; i < lent; i++){
		var change = parseInt(snake[i]);

		node = document.getElementById('elem_' + change);
		node.style.backgroundColor = '#fff';
	}
}


function rebuildSnake(){
	var lent = snake.length;

	for(i = 0; i < lent; i++){
		var change = parseInt(snake[i]);

		node = document.getElementById('elem_' + change);
		node.style.backgroundColor = '#222';
	}
}


function perdu(){
	var table = document.getElementsByTagName('table')[0],
		perdu = document.getElementById('perdu');

	table.style.display = "none";
	perdu.style.display = "block";
}

function doCanvas(){

    ctx.fillStyle = "rgb(255, 50, 50)";
    //gauche
    ctx.moveTo(25, 25);
    ctx.lineTo(25, 175);
    ctx.lineTo(0, 160);
    ctx.lineTo(0, 40);
    ctx.fill();

    //haut
    ctx.moveTo(25, 25);
    ctx.lineTo(175, 25);
    ctx.lineTo(160, 0);
    ctx.lineTo(40, 0);
    ctx.fill();

    //droite
    ctx.moveTo(175, 25);
    ctx.lineTo(175, 175);
    ctx.lineTo(200, 160);
    ctx.lineTo(200, 40);
    ctx.fill();

    //bas
    ctx.moveTo(25, 175);
    ctx.lineTo(175, 175);
    ctx.lineTo(160, 200);
    ctx.lineTo(40, 200);

    ctx.fill();
}
//-- FUNCTION --//

//-- INITIALISATION --//
popBonus();
makeSnake();
//-- INITIALISATION --//

//-- LISTEN --//
document.addEventListener('keydown', function(e){


	if(e.keyCode <= 40 && e.keyCode >= 37){

        if(inMove == true){

            //left
            if(e.keyCode == 37){
                if(move != 39){
                    move = e.keyCode;

                    inMove = false;
                }
            }//top
            else if(e.keyCode == 38){
                if(move != 40){
                    move = e.keyCode;

                    inMove = false;
                }
            }//right
            else if(e.keyCode == 39){
                if(move != 37){
                    move = e.keyCode;

                    inMove = false;
                }
            }//bottom
            else if(e.keyCode == 40){
                if(move != 38){
                    move = e.keyCode;

                    inMove = false;
                }
            }

            if(start == false){
                start = true;
                moveSnake(e.keyCode);
                startScore();
            }

        }
	}

});

var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
var dirLeft = document.getElementById('left'),
	dirTop = document.getElementById('top'),
	dirRight = document.getElementById('right'),
	dirBottom = document.getElementById('bottom');


var htracker = new headtrackr.Tracker({detectionInterval : 50});
htracker.init(videoInput, canvasInput);
htracker.start();

document.addEventListener('headtrackingEvent',  function(e){

    //initialise canvas
    ctx.clearRect(0, 0, 200, 200);
    doCanvas();

    //move point
    var moved = document.getElementById('move'),
        bottom = parseInt((e.y * 18) - 50),
        left = parseInt((e.x * 12) + 100);

    moved.style.bottom = bottom + 'px';
    moved.style.left = left + 'px';

    if(inMove == true){
        if(left <= 20){//right
            if(move != 39){
                move = 37;

                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 25);
                ctx.lineTo(25, 175);
                ctx.lineTo(0, 160);
                ctx.lineTo(0, 40);
                ctx.fill();

                inMove = false;

                console.log('right');
            }
        }
        else if(left >= 125){//left
            if(move != 37){
                move = 39;

                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(175, 25);
                ctx.lineTo(175, 175);
                ctx.lineTo(200, 160);
                ctx.lineTo(200, 40);
                ctx.fill();

                inMove = false;

                console.log('left');
            }
        }
        else if(bottom >= 170){//top
            if(move != 40){
                move = 38;


                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 25);
                ctx.lineTo(175, 25);
                ctx.lineTo(160, 0);
                ctx.lineTo(40, 0);
                ctx.fill();

                inMove = false;

                console.log('top');
            }
        }
        else if(bottom <= 22){//bottom
            if(move != 38){
                move = 40;

                ctx.fillStyle = "#ff00bb";
                ctx.moveTo(25, 175);
                ctx.lineTo(175, 175);
                ctx.lineTo(160, 200);
                ctx.lineTo(40, 200);

                inMove = false;

                console.log('bottom');
            }
        }

        if(start == false){
            start = true;
            moveSnake();
            startScore();
        }
    }
	
});
//-- LISTEN --//

doCanvas();

console.log()