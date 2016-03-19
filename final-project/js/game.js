


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


function loadGame(){
	defineGrid();
	updateScore();
	allWinningMoves = new Array;
	getAllPossibleWins();
	currentPlayer = player_1;
};


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





/*////////////////////////////////////////////////////////////////////////////

Get All The Win Combinations

////////////////////////////////////////////////////////////////////////////*/


function getAllPossibleWins(){

	if(board.game == 'tictac'){
		var winLength = 3;						// 3 in row wins
	} else if (board.game == 'connect'){
		var winLength = 4;						// 4 in row wins
	}

	var gridSpace = Object.keys(board.grid);	// gets all grid values

	for (z = 0; z<gridSpace.length; z++){		// check each grid spot
		
		var coordinates = gridSpace[z];			// returns 'x-y'
		var x = parseInt(coordinates[0]);		// gets (x)
		var y = parseInt(coordinates[2]);		// gets (y)
		var i = winLength - 1;

		if ((x+i) <= board.cols){
			var logWin = [						// get horizontal wins
				((x+0) + "-" + y),
				((x+1) + "-" + y),
				((x+2) + "-" + y),
				((x+3) + "-" + y)
			];
			if(board.game == 'tictac'){
				logWin.length = 3;
			};

			// console.log ("horz:  "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ((y+i) <= board.rows){
			var logWin = [						// get vertical wins
				(x + "-" + (y+0)),
				(x + "-" + (y+1)),
				(x + "-" + (y+2)),
				(x + "-" + (y+3))
			];
			if(board.game == 'tictac'){
				logWin.length = 3;
			};
			
			// console.log ("  vert:  "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ((x+i) <= board.cols && (y+i) <= board.rows){
			var logWin = [						// get diagonal wins
				(x+0 + "-" + (y+0)),
				(x+1 + "-" + (y+1)),
				(x+2 + "-" + (y+2)),
				(x+3 + "-" + (y+3))
			];
			if(board.game == 'tictac'){
				logWin.length = 3;
			};
			
			// console.log ("    diag1:  "+ logWin);
			allWinningMoves.push(logWin);
		};

		if ((x-i) >= 1 && (y+i) <= board.rows){
			var logWin = [						// get other diagonal wins
				(x-0 + "-" + (y+0)),
				(x-1 + "-" + (y+1)),
				(x-2 + "-" + (y+2)),
				(x-3 + "-" + (y+3))
			];
			if(board.game == 'tictac'){
				logWin.length = 3;
			};

			// console.log ("    diag2:  "+ logWin);
			allWinningMoves.push(logWin);
		};
	};

};

