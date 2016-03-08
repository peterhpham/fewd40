$(document).ready(function(){



	console.log('buildmenu.js load success');


	$('#menu-select').on('click', function(){
		$('#menu').toggle();
		console.log('click success');

	});



	buildMenu = function(){

		for ( i=0; i<cityIndex.length; i++){
			$('#menu-list ul').append('<li>'+cityIndex[i].name+'</li>');
		};
		
		for ( i=0; i<cityIndex.length; i++){
			// var imgStyle = "style=\"background:url("+cityIndex[i].image")\"";
			$('#menu-gallery').append('<div class="img-gal">img</div>');
		};
		console.log($('#menu-list').html());
	};

	buildMenu();

});
