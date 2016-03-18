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
		player_2.ai = true;
		
		$('#score').html("<h3>" + player_1.name + ": <span id=\"p1-score\"></span></h3>");
		$('#score').append("<h3>" + player_2.name + ": <span id=\"p2-score\"></span></h3>");
		updateScore();

		$('#names-1').delay(200).fadeOut(200);
		$('#score').delay(400).fadeIn(200);
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
		player_2.ai = false;

		$('#score').html("<h3>" + player_1.name + ": <span id=\"p1-score\"></span></h3>");
		$('#score').append("<h3>" + player_2.name + ": <span id=\"p2-score\"></span></h3>");
		updateScore();

		$('#names-2').delay(200).fadeOut(200);
		$('#score').delay(400).fadeIn(200);
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
var allWinningMoves = new Array;








/*////////////////////////////
  	Initialize Game Board
////////////////////////////*/


// Determines all possible coordinates on x/y axes
function getGrid( numRows , numColumns ){
	cells = new Array;
	for (y=0; y<numRows; y++){
		for (x=0; x<numColumns; x++){
			cells.push( (x+1) + '-' + (y+1) );
			console.log('x:' + x);
		};
		console.log('   y:' + y);
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
	active: true,
};

// console.log(gameboard);









/*////////////////////////////
	  Determine Winner
////////////////////////////*/



/*	Pseudo 

	Iterate through each grid square
	Check if there are two moves on left/right
	Check if there are two moves on top/bottom
	Check if there are two moves on diagonal
	for each, make array of winning spaces
	create array of those combos
*/



function allPossibleWins(){
	
	var max_x = defineCols;
	var max_y = defineRows;
	var gridKeys = Object.keys(gameboard.grid);

	for (i = 0; i<gridKeys.length; i++){
		var coordinates = gridKeys[i];
		var this_x = parseInt( coordinates[0] );
		var this_y = parseInt( coordinates[2] );
		
		if ((this_x+2) <= max_x){
			var logWin = [
				( (this_x+0)  +  "-"  +   this_y ),
				( (this_x+1)  +  "-"  +   this_y ),
				( (this_x+2)  +  "-"  +   this_y )
			];
			// console.log ("   "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ((this_y+2) <= max_y){
			var logWin = [
				( this_x  +  "-"  +  (this_y+0) ),
				( this_x  +  "-"  +  (this_y+1) ),
				( this_x  +  "-"  +  (this_y+2) )
			];
			// console.log ("   "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ( (this_x+2) <= max_x && (this_y+2) <= max_y ){
			var logWin = [
				( this_x+0  +  "-"  +  (this_y+0) ),
				( this_x+1  +  "-"  +  (this_y+1) ),
				( this_x+2  +  "-"  +  (this_y+2) )
			];
			// console.log ("   "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ( (this_x-2) >= 1 && (this_y+2) <= max_y ){
			var logWin = [
				( this_x-0  +  "-"  +  (this_y+0) ),
				( this_x-1  +  "-"  +  (this_y+1) ),
				( this_x-2  +  "-"  +  (this_y+2) )
			];
			// console.log ("   "+ logWin);
			allWinningMoves.push(logWin);
		};

	};
	console.log(allWinningMoves);
	// return allWinningMoves;
};

allPossibleWins();



function compareMoves( key ) {
	// console.log("Does space " + gameboard.grid[ key ] + " = " + currentPlayer + " ?");
    return gameboard.grid[ key ] == currentPlayer;
};



gameboard.checkWin = function checkForWin(){

	if (currentPlayer == 'p1'){ 
		var player = player_1;
	} else if (currentPlayer == 'p2'){
		var player = player_2;
	};

	var win;
	for (i=0; i<allWinningMoves.length; i++){
		win = allWinningMoves[i].every(compareMoves);
		if (win == true) {break;}
	};

	console.log(win);
	if (win == true) {

		displayWinner( player.name );
		restartGame();
		player.score++;
		updateScore();
	}
	else {
		changeTurn();
		return false;
	};
};



function displayWinner( name ){
	$('.overlay-container').fadeIn(200);
	$('#gameover').show();
	$('#winner-text').html("<h1>" + name + " wins</h1>");
};



function updateScore(){
	$('#p1-score').html(player_1.score);
	$('#p2-score').html(player_2.score);
};










/*////////////////////////////
   	     Game Logic
////////////////////////////*/


/*  Pseudo 

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
		gameboard.checkWin();
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




/*   Pseudo AI choice

player 1 completes turn
Run changeTurn() function

Check if 2nd player is AI

Check all grid spaces, compile list of available moves
Store available spaces in array

// Easy - random number (0 - array.length)
// Medium - 
// Hard - 

A selection is generated
	- check if it's already chosen
		- if it is, block choice
	- mark square with player choice
	- check if that's a win
		- if not, check if it's a tie
			- if either, display dialog overlay
	- move complete, next turn ready
*/



// Random bot selection
function botChoice(){
	console.log('bots turn');
	var availableMoves = new Array;

		$.each( gameboard.grid, function( key, value ) {
			if ( gameboard.grid[ key ] == null ){
				availableMoves.push(key);
			}
		});
		var arrIndex = genNum( availableMoves );
		var selectedSquare = availableMoves[ arrIndex ];
		var validMove = checkValid( selectedSquare );
	
		// Is that a valid choice?
		if ( validMove === true ){
			
			// Pass selection and player name into function
			makeMove( currentPlayer , selectedSquare );
			gameboard.checkWin( currentPlayer );
		};
};


function genNum( arr ){
	var i = Math.floor(Math.random() * arr.length);
	return i;
};


// Defines all actions that occur after a selection is made
function makeMove( player , selectedSquare ){
	console.log(selectedSquare);
	$( '#' + selectedSquare ).addClass( player + '-pick');
	gameboard.grid[ selectedSquare ] = player;
};



function changeTurn(){

	if (currentPlayer == player_1.id){
		currentPlayer = player_2.id;
		if (player_2.ai === true){
			var timeoutID = window.setTimeout(botChoice, 300);
			// botChoice();
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