var tempF;

function convert(){
	// tempF = $('#input').val();

	tempF = $('#input').val();
	tempF = parseFloat(tempF);
	// console.log(tempF);

	var isValid = isNaN(tempF); 
	// console.log(isValid);

	if(isValid === false){
		// console.log("if sttement");
		var tempC = ((tempF-32)/1.8);
		$('#output').attr("placeholder",tempC);

	} else {
		console.log("Error");
		$('#output').attr("placeholder", "Error!");
	}

}

$('#convertButton').click(convert);