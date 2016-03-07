/*////////////////////////////
   Esablish Game Parameters
////////////////////////////*/


// Global variables //

var defineRows = 3;
var defineCols = 3;

var x_axisValues = ['1','2','3','4','5','6','7','8','9','10'];
var y_axisValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

var currentPlayer = 'user';


// Helpers //

// Determines all possible coordinates on x/y axes
var getGrid = function( numRows , numColumns ){
	cells = new Array;
	for (i=0; i<numRows; i++){
		for (z=0; z<numColumns; z++){
			cells.push(y_axisValues[i] + x_axisValues[z]);
		};
	};
	return cells;
};




// Takes array of cooridinates and adds to new object
var getCoordinates = function(){
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
	grid: getCoordinates()
};

console.log(gameboard);





/*////////////////////////////
	  Determine Winner
////////////////////////////*/



gameboard.checkWin = function(player){

	if (this.grid.a1 == player && this.grid.a2 == player && this.grid.a3 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.b1 == player && this.grid.b2 == player && this.grid.b3 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.c1 == player && this.grid.c2 == player && this.grid.c3 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.a1 == player && this.grid.b1 == player && this.grid.c1 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.a2 == player && this.grid.b2 == player && this.grid.c2 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.a3 == player && this.grid.b3 == player && this.grid.c3 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.a1 == player && this.grid.b2 == player && this.grid.c3 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	if (this.grid.a3 == player && this.grid.b2 == player && this.grid.c1 == player) {
		// alert(player + ' is the winner');
		$('.board').html("<h2>" + player + " is the winner</h2>");
	};
	return false;
};



/*////////////////////////////
   	     Game Logic
////////////////////////////*/



// User selectionion
$('div.grid-square').on('click', function(){

	currentPlayer = 'user';
	var selection = $(this).attr('id');

	makeMove(currentPlayer,selection);
	// Change turns
	botChoice();
});




// Random bot selection
var botChoice = function(){
	currentPlayer = 'bot';

	while (gameboard.grid[selection] !== null){
		
		var genNum = function(){
			var i = Math.floor(Math.random() * cells.length);
			return i;
		};
		var selection = cells[genNum()];
	};

	makeMove(currentPlayer,selection);

};




var makeMove = function(player,selection){

	$('#'+selection).addClass(player+'-pick');
	gameboard.grid[selection] = player;
	gameboard.checkWin(player);
	console.log(player + ' selected ' + selection);
};



// Determine whose turn it is
// Create random computer selection
// 	- determine if space is taken 
//		-if yes, re roll
// Declare a Reset function
// 	- Change all values to initial
//	- Display Winner statement on screen


