$(document).ready(function(){
	
	// Prevent page reload upon submission
	$('a').click(function(event) {
	  event.preventDefault();
	});

	$('input:submit').click(function(event) {
	  event.preventDefault();
	});

});




/*////////////////////////////////////////////////////////////////////////////

Menu Flow Control

////////////////////////////////////////////////////////////////////////////*/


// Logotype fade in/out

$('#welcome').delay(400).fadeIn(600).delay(600).fadeOut(600);
$('#game-list').delay(2200).fadeIn(600);
var isNewGame = true;
var changePlayers;

// New games list menu
$('#choose-tictac').on('click', function(){
	board.cols = 3;
	board.rows = 3;
	board.game = 'tictac';
	loadGame();
	

	// if(isNewGame === false){
		$('#game-list').fadeOut(200);
		$('#'+board.game).delay(200).fadeIn(200);
	// } else {
		// $('#game-list').fadeOut(200);
		// $('#choose-players').delay(600).fadeIn(200);
		// isNewGame = false;
	// }
});

$('#choose-connect').on('click', function(){
	board.cols = 5;
	board.rows = 5;
	board.game = 'connect';
	loadGame();

	// if(isNewGame === false){
		$('#game-list').fadeOut(200);
		$('#'+board.game).delay(200).fadeIn(200);
	// } else {
	// 	$('#game-list').fadeOut(200);
	// 	$('#choose-players').delay(600).fadeIn(200);
	// 	isNewGame = false;
	// }
});

$('#choose-checkers').on('click', function(){
	board.game = 'checkers';
	alert('Sorry, this game is not yet ready');
});







/*////////////////////////////////////////////////////////////////////////////

Player Options

////////////////////////////////////////////////////////////////////////////*/



// Show Names
function toggleNames(){
	$('.player1-name').delay(1000).fadeToggle(800);
	$('.player2-name').delay(1000).fadeToggle(800);
	$('.player1-score').delay(1000).fadeToggle(800);
	$('.player2-score').delay(1000).fadeToggle(800);
}

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



// Enter name for 1 player

$('#names-1 :submit').on('click', function(){
	
	if ($('#p1-name').val() !== "") {

		player_1.name = $('#names-1 #p1-name').val().toLowerCase();
		player_2.name = 'wallace';
		player_2.ai = true;
		
		$('.player1-name').html(player_1.name);
		$('.player2-name').html(player_2.name);
		updateScore();

		$('#names-1').delay(200).fadeOut(200);
		$('#'+board.game).delay(400).fadeIn(200);
		toggleNames();
	};
});



// Enter name for 2 player

$('#names-2 :submit').on('click', function(){

	// Requrire fields
	if ($('#names-2 #p1-name').val() == ""){
		$('#names-2 #p1-name').focus();
	} 
	else if ($('#names-2 #p2-name').val() == ""){
		$('#names-2 #p2-name').focus();
	} 
	else {

		// After names filled, do these things:

		player_1.name = $('#names-2 #p1-name').val().toLowerCase();
		player_2.name = $('#names-2 #p2-name').val().toLowerCase();
		player_2.ai = false;

		$('.player1-name').html(player_1.name);
		$('.player2-name').html(player_2.name);
		updateScore();

		$('#names-2').delay(200).fadeOut(200);
		$('#'+board.game).delay(400).fadeIn(200);
		toggleNames();
	};
});






/*////////////////////////////////////////////////////////////////////////////

Additional Menu Options

////////////////////////////////////////////////////////////////////////////*/


// Menu Button

$('#menu-button a').on('click', function(){
	$('#gameover').show();
	$('.overlay-container').fadeToggle(400);
});



// Win screen options

$('#play-again').on('click', function(){
	$('#play-again span').fadeOut(200);
	restartGame();
});

$('#settings-games').on('click', function(){
	$('.overlay-container').fadeOut(200);
	$('.board-wrap').hide();
	$('#game-list').delay(200).fadeIn(300);
});

$('#settings-names').on('click', function(){
	$(this).next('.dropdown').slideToggle(200);
});

$('#settings-players').on('click', function(){
	$(this).next('.dropdown').slideToggle(200);
});

$('#change-1p').on('click', function(){
	$('#settings-players').next('.dropdown').delay(100).slideToggle(200);	
	changePlayers = 1;
});
$('#change-2p').on('click', function(){
	$('#settings-players').next('.dropdown').delay(100).slideToggle(200);
	changePlayers = 2;
});
		

$('#save-settings').on('click', function(){
	console.log('save');

	player_1.name = $('#change-p1-name').val().toLowerCase();
	player_2.name = $('#change-p2-name').val().toLowerCase();

	if (changePlayers === 1){
		player_2.ai = false;
		player_2.name = 'wallace';

	} else if (changePlayers === 2){
		player_2.ai = true;
	}

	$('.player1-name').html(player_1.name);
	$('.player2-name').html(player_2.name);
	updateScore();
	loadGame();
	restartGame();
	$('.overlay-container').delay(200).fadeOut(200);

});

