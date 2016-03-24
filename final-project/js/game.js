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
	rows: 0,
	cols: 0,
	grid: {},
	game: 'tictac',
	active: true,
};
var activeAnimation = false;





/*////////////////////////////////////////////////////////////////////////////

Initialize New Game

////////////////////////////////////////////////////////////////////////////*/


function loadGame(){
	// changeBackground();
	defineGrid();
	updateScore();
	allWinningMoves = new Array;
	getAllPossibleWins();
	currentPlayer = player_1;
	restartGame();
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

// function changeBackground(){
	// $('body').css( 'background-color' , '#25264C' );
// }



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
	$('.player1-score').html(player_1.score);
	$('.player2-score').html(player_2.score);
};

function showWinCombo(arr){
	var winningKeys = arr;
	for (i=0; i<winningKeys.length; i++){
		$('#' + winningKeys[i]).addClass('flash');
	}

}
function restartGame(){
	$('.tictac-square').removeClass('p1-tictac p2-tictac flash');
	$('.connect-square').removeClass('p1-connect p2-connect p1-connect-temp flash');

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
			var timeoutID = window.setTimeout(botChoice, 100);
		};
	}; 
};


function checkWin(){
	for (i=0; i<allWinningMoves.length; i++){

		var win = allWinningMoves[i].every(compareMoves);
		if (win === true) {
			currentPlayer.score++;
			showWinCombo(allWinningMoves[i]);
			$('#play-again span').delay(600).fadeIn(400);

			// displayWinner();
			updateScore();
			// restartGame();
			break;
		};
	};
	togglePlayers();
	return false;
};


function getStartPoint( column , player ){
	
	var newW = $('.connect-square').width();
	var newH = $('.connect-square').height();
	$('#move-circle-p1').width(newW).height(newH);
	$('#move-circle-p2').width(newW).height(newH);

	//Calculate starting point
	var startPoint = $('#'+column).offset();
	startX = startPoint.left;
	startY = startPoint.top;

	if (activeAnimation == false){
		console.log('activeAnimation was false');
		$('#move-circle-' + player).offset({ top: startY-88, left: startX });

	};
};







/*////////////////////////////////////////////////////////////////////////////

Move Selection Functions

////////////////////////////////////////////////////////////////////////////*/



// Check if selection is already taken
function isSpaceOpen( space ){
	if (board.grid[ space ] === null){
		return true;
	} else {
		return false;
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


// Check if connect column is full
function isColumnFull( space ){

	var x = space;
	var y = 1;
	var columnTop = x + '-' + y;

	if (board.grid[ columnTop ] === null){
		return false;
	} else {
		resetColSelect();
		return true;
	};
};


// Finds next open space in column stack
function getNextOpenSpace( column ){
	if (isColumnFull( column ) !== true ){
		for (i=board.rows; i>=1; i--) {
			var check = column + '-' + i;
			if (isSpaceOpen( check ) === true ){
				return check;
				break;
			};
		};
	};
};


// Defines all actions that occur after a selection is made
function makeMove( select ){
	
	// TicTacToe - Applies x/o symbol to space, update board object
	if (board.game === 'tictac'){
		$('#'+select + '.tictac-square').addClass( currentPlayer.id + '-tictac');
		board.grid[ select ] = currentPlayer.id;
		checkWin();
	};
	
	// Connect Four - Applies x/o symbol to space, update board object
	if (board.game === 'connect'){
		$('#'+select + '.connect-square').addClass( currentPlayer.id + '-connect');
		board.grid[ select ] = currentPlayer.id;
		checkWin();
	};
	
	// Checkers
	if (board.game === 'checkers'){
		//
	};
};







/*////////////////////////////////////////////////////////////////////////////

Connect 4 Functions

////////////////////////////////////////////////////////////////////////////*/


// Animate chip falling into place
function animateSelection( column ){

	var space = getNextOpenSpace( column );
	getStartPoint( column , currentPlayer.id );
	activeAnimation = true;

	//Calculate end point
	var endPoint = $('#'+space+'.connect-square').offset();
	endY = endPoint.top;
	
	$('#move-circle-' + currentPlayer.id).css('visibility','visible');
	$('#move-circle-' + currentPlayer.id).animate({
		top: endY
		}, 1000, 'easeOutExpo', function() { 
			$('#move-circle-' + currentPlayer.id).offset({ top: -1000, left: -1000 });
			$('#move-circle-' + currentPlayer.id).css('visibility','hidden');
			activeAnimation = false;
			makeMove(space);
			
		}
	);
};


function highlightColumn( column, color ){

	// Find all grid[keys] that share same "x-" value
	$.each( board.grid, function( key, value ){

		if (key.includes(column + '-') === true){
			$(('#'+key) + ('.connect-square')).css('background',color);
		};
	});
};







/*////////////////////////////////////////////////////////////////////////////

User Move Selection

////////////////////////////////////////////////////////////////////////////*/


// Tic Tac Toe
$('div.tictac-square').on('click', function(){
	var userSelect = $(this).attr('id');
	if (isSpaceOpen( userSelect ) === true ){
		makeMove( userSelect );
	};
});



// Connect4 column hover
$('div.column-select').hover(
	function(){	// on mouseover
		columnSelect = $(this).attr('id');
		getStartPoint( columnSelect , 'p1' );
		

		if (activeAnimation === false){
			$('#move-circle-p1').css('visibility','visible')
			.addClass('pulse');
		};


		var space = getNextOpenSpace( columnSelect );
		$('#' + space + '.connect-square').addClass('p1-connect-temp');

	}, function resetColSelect(){	// on mouseout
		var space = getNextOpenSpace( columnSelect );
		$('#' + space + '.connect-square').removeClass('p1-connect-temp');
		if (activeAnimation === false){
			$('#move-circle-' + currentPlayer.id)
				.removeClass('pulse')
				.offset({ top: -1000, left: -1000 });
		};
	}
);



// Connect4 column click
$('div.column-select').on('click', function(){
	animateSelection( columnSelect );
	$('#move-circle-' + currentPlayer.id).removeClass('pulse');
});








/*////////////////////////////////////////////////////////////////////////////

AI Move Selection

////////////////////////////////////////////////////////////////////////////*/


// Randomly select one of remaining available moves
function botChoice(){

	if (board.game === 'tictac'){
		var availableMoves = getAvailableMoves();
		var randomIndex = Math.floor( Math.random() * availableMoves.length );
		var botSelect = availableMoves[ randomIndex ];
		makeMove( botSelect );
	};

	if (board.game === 'connect'){
		var randomIndex = Math.ceil( Math.random() * board.cols );
		animateSelection( randomIndex );
	};

	if (board.game === 'checkers'){
		//
	};

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





