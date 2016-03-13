$(document).ready(function(){
	
	// Prevent page reload upon submission
	$('a').click(function(event) {
	  event.preventDefault();
	});

	$('input:submit').click(function(event) {
	  event.preventDefault();
	});

});





/*////////////////////////////
   Initialization Flow
////////////////////////////*/

// $('#welcome').delay(400).fadeIn(600).delay(600).fadeOut(600);
// $('#game-list').delay(2200).fadeIn(600);
$('#intro').show();



// Intro games list 

$('#choose-tictac').on('click', function(){
	$('#intro').delay(200).fadeOut(200);
	$('#choose-players').delay(600).fadeIn(200);
});

$('#choose-connect').on('click', function(){
	alert('Sorry, this game is not yet ready');
});

$('#choose-checkers').on('click', function(){
	alert('Sorry, this game is not yet ready');
});



// Choose 1 or 2 players

$('#one-player').on('click', function(){
	$('#choose-players').delay(200).fadeOut(200);
	$('#names-1').delay(400).fadeIn(200);
	$('#names-1 #p1-name').delay(700).focus();
});

$('#two-player').on('click', function(){
	$('#choose-players').delay(200).fadeOut(200);
	$('#names-2').delay(400).fadeIn(200);
	$('#names-2 #p1-name').delay(700).focus();
});



// Enter player names

$('#names-1 :submit').on('click', function(){
	if ($('#p1-name').val() !== "") {

		player_1.name = $('#names-1 #p1-name').val().toLowerCase();
		player_2.name = 'computer';
		
		$('#score').html("<h3>" + player_1.name + ": <span id=\"p1-score\"></span></h3>");
		$('#score').append("<h3>" + player_2.name + ": <span id=\"p2-score\"></span></h3>");
		updateScore();

		$('#names-1').delay(200).fadeOut(200);
		$('#score').delay(200).fadeIn(200);
		$('.board').delay(400).fadeIn(200);
	};
});

$('#names-2 :submit').on('click', function(){

	// Requrire fields
	if ($('#names-2 #p1-name').val() == ""){
		$('#names-2 #p1-name').focus();
	} 
	else if ($('#names-2 #p2-name').val() == ""){
		$('#names-2 #p2-name').focus();
	} 
	else {

		player_1.name = $('#names-2 #p1-name').val().toLowerCase();
		player_2.name = $('#names-2 #p2-name').val().toLowerCase();

		$('#score').html("<h3>" + player_1.name + ": <span id=\"p1-score\"></span></h3>");
		$('#score').append("<h3>" + player_2.name + ": <span id=\"p2-score\"></span></h3>");
		updateScore();

		$('#names-2').delay(200).fadeOut(200);
		$('#score').delay(200).fadeIn(200);
		$('.board').delay(400).fadeIn(200);
	};
});



// Win screen options

$('#replay-tictac').on('click', function(){
	$('.overlay-container').fadeOut(300);
	restartGame();
});

$('#different-game').on('click', function(){
	$('.overlay-container').toggle();
	$('.board').hide();
	$('#game-list').fadeIn(300);
});



// New games list menu

$('#new-tictac').on('click', function(){
	$('#game-list').fadeOut(200);
	$('.board').delay(200).fadeIn(200);
	restartGame();
});

$('#new-connect').on('click', function(){
	alert('Sorry, this game is not yet ready');
});

$('#new-checkers').on('click', function(){
	alert('Sorry, this game is not yet ready');
});



// Overlay Test Button

$('#settings a').on('click', function(){
	$('#gameover').show();
	$('.overlay-container').toggle();
});


// Game hover //
// $('div.grid-square').on('mouseover', function(){
// 	if ( gameboard.grid[ $(this).attr('id') ] == null ){
// 		$( this ).addClass('hover');

// 		$('div.grid-square').on('mouseout', function(){
// 			$( this ).removeClass('hover');

// 		});
// 	};
// });






/*////////////////////////////
  	Player - Variables
////////////////////////////*/


var player_1 = {
	id: "p1",
	name: "Player 1",
	score: 0
};
var player_2 = {
	id: "p2",
	name: "Player 2",
	score: 0,
	ai: false
};

$('#p1-score').html( player_1.score );
$('#p2-score').html( player_2.score );

var currentPlayer = player_1.id;
var colorTheme;







/*////////////////////////////
  	TicTac - Variables
////////////////////////////*/


var defineRows = 3;
var defineCols = 3;

var x_axisValues = ['1','2','3','4','5','6','7','8','9','10'];
var y_axisValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];





/*////////////////////////////
  	Initialize Game Board
////////////////////////////*/


// Determines all possible coordinates on x/y axes
function getGrid( numRows , numColumns ){
	cells = new Array;
	for (i=0; i<numRows; i++){
		for (z=0; z<numColumns; z++){
			cells.push(y_axisValues[i] + x_axisValues[z]);
		};
	};
	return cells;
};


// Takes array of cooridinates and adds to new object
function getCoordinates(){
	getGrid( defineRows , defineCols );
	defineGrid = new Object;

	for (i=0; i<cells.length; i++){
		var cellName = cells[i];
		defineGrid[cellName] = null;
	};
	return defineGrid;
};


// Define board as object to access later
var gameboard = {
	rows: defineRows,
	cols: defineCols,
	grid: getCoordinates(),
	game: 'tictac',
	active: true
};

// console.log(gameboard);









/*////////////////////////////
	  Determine Winner
////////////////////////////*/


function displayWinner( name ){
	$('.overlay-container').fadeIn(200);
	$('#gameover').show();
	$('#winner-text').html("<h1>" + name + " wins</h1>");
};

function updateScore(){
	$('#p1-score').html(player_1.score);
	$('#p2-score').html(player_2.score);
};

gameboard.checkWin = function( input ){

	if (input == 'p1'){ 
		var player = player_1;
	} else if (input == 'p2'){
		var player = player_2;
	};

	if (
		(this.grid.a1 == player.id && this.grid.a2 == player.id && this.grid.a3 == player.id) ||
		(this.grid.b1 == player.id && this.grid.b2 == player.id && this.grid.b3 == player.id) ||
		(this.grid.c1 == player.id && this.grid.c2 == player.id && this.grid.c3 == player.id) ||
		(this.grid.a1 == player.id && this.grid.b1 == player.id && this.grid.c1 == player.id) ||
		(this.grid.a2 == player.id && this.grid.b2 == player.id && this.grid.c2 == player.id) ||
		(this.grid.a3 == player.id && this.grid.b3 == player.id && this.grid.c3 == player.id) ||
		(this.grid.a1 == player.id && this.grid.b2 == player.id && this.grid.c3 == player.id) ||
		(this.grid.a3 == player.id && this.grid.b2 == player.id && this.grid.c1 == player.id) )
		{
			displayWinner( player.name );
			restartGame();
			player.score++;
			updateScore();
		}
	else {
		return false;
	};
};








/*////////////////////////////
   	     Game Logic
////////////////////////////*/


/*   Pseudo 

Game Loads, player 1 turn first
First player selects a square
	- check if it's already chosen
		- if it is, block choice
	- mark square with player choice
	- check if that's a win
		- if not, check if it's a tie
			- if either, display dialog overlay
	- move complete, next turn ready



*/







// Capture player's board move
$('div.grid-square').on('click', function(){
	
	// Get selected grid cell's #id
	var selectedSquare = $( this ).attr('id');
	var validMove = checkValid( selectedSquare );
	
	// Is that a valid choice?
	if ( validMove === true ){
		
		// Pass selection and player name into function
		makeMove( currentPlayer , selectedSquare );
		gameboard.checkWin( currentPlayer );
		changeTurn();
	};
});



function checkValid( check ){
	if ( gameboard.grid[ check ] == null ){
		// console.log("move is good");
		return true;
	} else {
		// console.log("move is bad");
		return false;
	};
};



// Random bot selection
function botChoice(){
	if (gameboard.active == true){

		currentPlayer = 'bot';

		while (gameboard.grid[selectedSquare] !== null){
			
			var genNum = function(){
				var i = Math.floor(Math.random() * cells.length);
				return i;
			};
			var selectedSquare = cells[genNum()];
		};

		makeMove( currentPlayer , selectedSquare );
	};
};



// Defines all actions that occur after a selection is made
function makeMove(player,selectedSquare){
	$( '#' + selectedSquare ).addClass( player + '-pick');
	gameboard.grid[ selectedSquare ] = player;
};



function changeTurn(){

	if (currentPlayer == player_1.id){
		currentPlayer = player_2.id;
		if (player_2.ai === true){
			botChoice();
		};
	} else if (currentPlayer == player_2.id){
		currentPlayer = player_1.id;
	};
};



function restartGame(){
	gameboard.active = false;
	$('.grid-square').removeClass('p1-pick p2-pick');

	// Resets each grid value to null
	$.each( gameboard.grid, function( key, value ) {
	  gameboard.grid[key] = null;
	});
};


