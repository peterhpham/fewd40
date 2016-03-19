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



$('#welcome').delay(400).fadeIn(600).delay(600).fadeOut(600);
$('#intro').delay(2200).fadeIn(600);
// $('#intro').show();





// Intro games list 
$('#choose-tictac').on('click', function(){
	$('#intro').delay(200).fadeOut(200);
	$('#choose-players').delay(600).fadeIn(200);
	chosenGame = '#tictac';
});

$('#choose-connect').on('click', function(){
	chosenGame = '#connect';
	$('#intro').delay(200).fadeOut(200);
	$(chosenGame).delay(400).fadeIn(200);
});

$('#choose-checkers').on('click', function(){
	alert('Sorry, this game is not yet ready');
	chosenGame = '#checkers';
});





// New games list menu
$('#new-tictac').on('click', function(){
	chosenGame = '#tictac';
	$('#game-list').fadeOut(200);
	$(chosenGame).delay(200).fadeIn(200);
	restartGame();
});

$('#new-connect').on('click', function(){
	chosenGame = '#connect';
	$('#game-list').fadeOut(200);
	$(chosenGame).delay(200).fadeIn(200);
	restartGame();
});

$('#new-checkers').on('click', function(){
	chosenGame = '#checkers';
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
		$(chosenGame).delay(400).fadeIn(200);
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

		// After names filled, do these things:

		player_1.name = $('#names-2 #p1-name').val().toLowerCase();
		player_2.name = $('#names-2 #p2-name').val().toLowerCase();
		player_2.ai = false;

		$('#score').html("<h3>" + player_1.name + ": <span id=\"p1-score\"></span></h3>");
		$('#score').append("<h3>" + player_2.name + ": <span id=\"p2-score\"></span></h3>");
		updateScore();

		$('#names-2').delay(200).fadeOut(200);
		$('#score').delay(400).fadeIn(200);
		$(chosenGame).delay(400).fadeIn(200);
	};
});





// Win screen options

$('#replay-tictac').on('click', function(){
	$('.overlay-container').fadeOut(300);
	restartGame();
});

$('#different-game').on('click', function(){
	$('.overlay-container').toggle();
	$('.board-wrap').hide();
	$('#game-list').fadeIn(300);
});





/*////////////////////////////////////////////////////////////////////////////

Additional Menu Options

////////////////////////////////////////////////////////////////////////////*/


// Menu Button

$('#settings a').on('click', function(){
	$('#gameover').show();
	$('.overlay-container').fadeToggle(400);
});