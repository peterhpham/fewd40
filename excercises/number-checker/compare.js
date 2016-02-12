// alert("starts");

// Load Variables from HTML



function submit(){

	// alert("Function Called");
	var userNum1 = document.getElementById('num1').value;
	var userNum2 = document.getElementById('num2').value;
	var userNum3 = document.getElementById('num3').value;

	userNum1 = Number(userNum1);
	console.log(userNum1);
	userNum2 = Number(userNum2);
	userNum3 = Number(userNum3);


	if (userNum1 == NaN || userNum2 == NaN || userNum3 == NaN){
		console.log("Numbers entered not valid")
	
	} else if (userNum1 == 0 || userNum2 == 0 || userNum3 == 0){
		console.log("Numbers entered not valid")

			} else {

		numCompare(userNum1,userNum2,userNum3);
		// console.log("In function we have "+userNum1+", "+userNum2+", "+userNum3);

	}

	
}


function numCompare(num1,num2,num3) {
	var nums = [num1,num2,num3];
	// alert("In function we have "+x+", "+y+", "+z);

var currentHigh;
	  // alert("nums array 3 ="+nums[2]);
	  if (nums[0] > nums[1]){
	    currentHigh=nums[0];
	    // alert("first check done");
	  } else {
	  	currentHigh=nums[1]
	  }
	// alert("first check done");
  if (nums[2] > currentHigh){
    currentHigh=nums[2];
  }
   console.log("The highest number is "+currentHigh);

}
