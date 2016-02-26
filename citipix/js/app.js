$(document).ready(function(){
	

	$('#upload-tool').hide();
	$('#submit-btn').hide();
	$('#city-type').focus();


	// Prevent page reload upon submission
	$("input:submit").click(function(event) {
	  event.preventDefault();
	});	
 

	var cityObj = new Object();
	var cityIndex = [
		{
			name : 'New York',
			keywords : ['newyork', 'newyorkcity', 'nyc', 'ny'],
			image : './images/nyc.jpg'
		},
		{
			name : 'Los Angeles',
			keywords : ['losangeles', 'la', 'lax'],
			image :  './images/la.jpg'
		},
		{
			name : 'San Francisco',
			keywords : ['sf', 'sfo', 'sanfrancisco', 'sanfran', 'bayarea'],
			image : './images/sf.jpg'
		},
		{
			name : 'Sydney',
			keywords : ['sydney', 'syd'],
			image : './images/sydney.jpg'
		},
		{
			name : 'Austin',
			keywords : ['austin', 'atx'],
			image : './images/austin.jpg'
		}
	];


	$('#submit-btn').on('click', function(event){

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
	 	$('#new-city').val(nameHint)
			.focus();
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