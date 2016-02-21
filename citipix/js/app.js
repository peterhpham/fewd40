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

		// Compare search input against index of cities
		for ( i = 0; i < cityIndex.length; i++){
			var checkCity = cityIndex[i];

			for( z = 0; z <= checkCity.length; z++){
				if (srchQry === checkCity[z]){

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
	var city1 = ['./images/nyc.jpg', 'new york', 'newyork', 'new york city', 'nyc', 'ny'];
	var city2 = ['./images/la.jpg', 'los angeles', 'losangeles', 'la', 'lax'];
	var city3 = ['./images/sf.jpg','sf', 'sfo', 'san francisco', 'san fran', 'bay area'];
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
		var addCity = $('#new-city').val();
		addCity = String(addCity).toLowerCase();

		//Capture new image path
		var addImage = $('#new-image').val();
		addImage = String(addImage).toLowerCase();

		//Assign name and image path to new array object
		cityIndex[i] = [addImage, addCity];
		$('#upload-tool').fadeOut();
		
	});

}); // Loads after document load




