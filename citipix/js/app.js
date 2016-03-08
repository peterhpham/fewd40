$(document).ready(function(){
	

	// Prevent page reload upon submission
	$("input:submit").click(function(event) {
	  event.preventDefault();
	});	


	$('#upload-tool').hide();
	$('#submit-btn').hide();
	$('#city-type').focus();

	var cityObj = new Object();




	// Build dropdown menu from array values
	var citySelectOptions = ["NYC", "SF", "LA", "ATX", "SYD"];
	for ( i=0; i<citySelectOptions.length; i++){
		console.log(citySelectOptions[i]);
		$('#city-select').append('<option>'+citySelectOptions[i]+'</option>');
	};

	// Change background image based on selection
	$('#city-select').on('change', function(){
		var imgName = $('#city-select').val().toLowerCase();
		$('body').css('background-image', 'url(./images/' + imgName + '.jpg)');
	});




	// Primary search function
	$('#submit-btn').on('click', function(){

		// Assign search input to var as a formatted string
		var srchQry = $('#city-type').val();
		srchQry = String(srchQry).toLowerCase();
		srchQry = srchQry.replace(/\s/g,'');

		// Compare search input against index of cities
		for ( i=0; i<cityIndex.length; i++){
			var checkKeywords = cityIndex[i].keywords;

			for( z=0 ; z<=checkKeywords.length; z++){

				if (srchQry === checkKeywords[z]){

					// Change background to matching city
					$('body').css('background-image', 'url(' + cityIndex[i].image + ')');

					// Close tool and reset inputs
					$('#upload-tool').fadeOut();
					return $('#city-type').val('');
				};
			};
		};

		// Reset input field and reveal upload tool
	 	var nameHint = $('#city-type').val();
	 	$('#city-type').val('');
	 	$('#upload-tool').slideDown();
	 	$('#new-city').val(nameHint).focus();

		// $('#city-select option').attr('selected');

	});




	// Allows user to input new city and image
	$('#upload-btn').on('click', function(){

		console.log(cityIndex);
		// Add new city to cityIndex array
		var i = cityIndex.length;
		cityIndex.push(cityObj);

		//Capture new city name
		var addCity = $('#new-city').val();
		addCity = String(addCity).toLowerCase();	//lowercase stringify
		addCity = addCity.replace(/\s/g,'')			//regExp to remove spaces
			.split(',');									

		//Capture new image path
		var addImage = $('#new-image').val();
		addImage = String(addImage);

		//Assign values to new city object
		cityIndex[i].name = addCity[0];
		cityIndex[i].keywords = addCity;
		cityIndex[i].image = addImage;

		//Close box and reset values
		$('#upload-tool').slideUp();
		$('#new-city').val('');
		$('#new-image').val('');
		$('#city-type').focus();
	});

});