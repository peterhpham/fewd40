


/*////////////////////////////////////////////////////////////////////////////

Global Variables

////////////////////////////////////////////////////////////////////////////*/


var player_1 = {
	id: "p1",
	name: "Player 1",
	score: 0,
	ai: false
};

var player_2 = {
	id: "p2",
	name: "Player 2",
	score: 0,
	ai: false
};

var board = {
	rows: 3,
	cols: 3,
	grid: {},
	game: 'tictac',
	active: true,
};




/*////////////////////////////////////////////////////////////////////////////

Initialize New Game

////////////////////////////////////////////////////////////////////////////*/



/*  Pseudo

	Get "current Game"
	Load board
		- get rows/columns
		- generate 2d grid
		- attach grid to board object
	Determine all Possible Wins
		 
*/



// Determines all possible coordinates on x/y axes
function defineGrid(){

	for (y=1; y <= board.rows; y++){
		for (x=1; x <= board.cols; x++){
			// Add coordinate x-y to grid object
			var newKey = x + '-' + y;
			board.grid[newKey] = null;
		};
	};
};


function loadGame(){
	defineGrid();
	updateScore();
	getAllPossibleWins();
	currentPlayer = player_1;
};







/*////////////////////////////////////////////////////////////////////////////

Game Support Functions

////////////////////////////////////////////////////////////////////////////*/


function compareMoves( key ) {
    return board.grid[ key ] == currentPlayer.id;
};


function displayWinner(){
	$('.overlay-container').fadeIn(200);
	$('#gameover').show();
	$('#winner-text').html("<h1>" + currentPlayer.name + " wins</h1>");
};


function updateScore(){
	$('#p1-score').html(player_1.score);
	$('#p2-score').html(player_2.score);
};


function restartGame(){
	board.active = false;
	$('.grid-square').removeClass('p1-pick p2-pick');

	// Resets each grid value to null
	$.each( board.grid, function( key, value ) {
	  board.grid[key] = null;
	});
};


function togglePlayers(){
	if (currentPlayer == player_2){
		currentPlayer = player_1;

	} else if (currentPlayer == player_1){
		currentPlayer = player_2;

		if (player_2.ai === true){
			var timeoutID = window.setTimeout(botChoice, 200);
		};
	};
};


function checkWin(){
	for (i=0; i<allWinningMoves.length; i++){

		var win = allWinningMoves[i].every(compareMoves);
		if (win === true) {
			currentPlayer.score++;
			displayWinner();
			updateScore();
			restartGame();
			break;
		};
	};
	togglePlayers();
	return false;
};






/*////////////////////////////////////////////////////////////////////////////

Game Logic

////////////////////////////////////////////////////////////////////////////*/


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



// Check if selection is already taken
function isSpaceOpen( space ){
	if (board.grid[ space ] === null){
		return true;
	} else {
		return false;
	};
};



// Defines all actions that occur after a selection is made
function makeMove( select ){

	if (board.game === 'tictac'){
		console.log('functon makeMove()');
		// Applies xo symbol to space, update board object
		$( '#' + select ).addClass( currentPlayer.id + '-pick');
		board.grid[ select ] = currentPlayer.id;
		checkWin();
	};
	if (board.game === 'connect'){
		//
	};
	if (board.game === 'checkers'){
		//
	};
};



// Gets list of all spaces still open
function getAvailableMoves(){
	var arr = new Array;
	$.each( board.grid, function( key, value ){
		if ( board.grid[key] == null ){
			arr.push(key);
		};
	});
	return arr;
};






/*////////////////////////////////////////////////////////////////////////////

User Move Selection

////////////////////////////////////////////////////////////////////////////*/


$('div.grid-square').on('click', function(){
	var userSelect = $(this).attr('id');
	if (isSpaceOpen( userSelect ) === true ){
		makeMove( userSelect );
	};
});






/*////////////////////////////////////////////////////////////////////////////

AI Move Selection

////////////////////////////////////////////////////////////////////////////*/



// Randomly select one of remaining available moves
function botChoice(){
	var availableMoves = getAvailableMoves();
	var randomIndex = Math.floor( Math.random() * availableMoves.length );
	var botSelect = availableMoves[ randomIndex ];
	makeMove( botSelect );
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
	- mark space with player choice
	- check if that's a win
		- if not, check if it's a tie
			- if either, display dialog overlay
	- move complete, next turn ready
*/






/*////////////////////////////////////////////////////////////////////////////

Get All The Win Combinations

////////////////////////////////////////////////////////////////////////////*/


/*	Pseudo 

	Iterate through each grid square
	Check if there are two moves on left/right
	Check if there are two moves on top/bottom
	Check if there are two moves on diagonal
	for each, make array of winning spaces
	create array of those combos
*/


function getAllPossibleWins(){
	
	var max_x = board.cols;
	var max_y = board.rows;
	var gridKeys = Object.keys(board.grid);

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
};

