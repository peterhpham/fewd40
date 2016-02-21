$(document).ready(function(){
	
	$('#upload-tool').hide();

	// Prevent page reload upon submission
	$("input:submit").click(function(event) {
	  event.preventDefault();
	});	





	$('#submit-btn').on('click', function(event){

		// Assign search input to var as a formatted string
		var srchQry = $('#city-type').val();
		srchQry = String(srchQry).toLowerCase();
		srchQry = srchQry.replace(/\s/g,'');

		// Compare search input against index of cities
		for ( i = 0; i < cityIndex.length; i++){
			var checkCity = cityIndex[i];

			for( z = 0; z <= checkCity.length; z++){

				if (srchQry.trim() === checkCity[z]){

					// Change background to matching city
					$('body').css('background', 'url(' + checkCity[0] + ')');

					// Close tool and reset inputs
					$('#upload-tool').fadeOut();
					return $('#city-type').val('');
				};
			};
		};

		// Reset input field and reveal upload tool
	 	$('#city-type').val('');
	 	$('#upload-tool').fadeIn();

	});





	// Adds of array of city name alternates
	// array[0] stores image location
	var city1 = ['./images/nyc.jpg', 'newyork', 'newyorkcity', 'nyc', 'ny'];
	var city2 = ['./images/la.jpg', 'losangeles', 'la', 'lax'];
	var city3 = ['./images/sf.jpg','sf', 'sfo', 'sanfrancisco', 'sanfran', 'bayarea'];
	var city4 = ['./images/sydney.jpg', 'sydney', 'syd'];
	var city5 = ['./images/austin.jpg', 'austin', 'atx'];

	// Create an index of all cities with images
	var cityIndex = [city1, city2, city3, city4, city5];





	// Allows user to input new city and image
	$('#upload-btn').on('click', function(){

		// Add new city to cityIndex array
		var i = cityIndex.length;
		cityIndex.push('city' + i);

		//Capture new city name
		//then parse into array split by comma, remove spaces 
		var addCity = $('#new-city').val();
		addCity = String(addCity).toLowerCase();
		addCity = addCity.replace(/\s/g,'').split(',');

		//Capture new image path
		var addImage = $('#new-image').val();
		addImage = String(addImage);

		//Assign name and image path to new array object
		cityIndex[i] = addCity;
		cityIndex[i].splice(0,0,addImage);

		//Close box and reset values
		$('#upload-tool').fadeOut();
		$('#new-city').val('');
		$('#new-image').val('');

	});

});




