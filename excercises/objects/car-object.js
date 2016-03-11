var myCar = {
	make: "honda",
	model: "civic",
	year: "1994",
	color: "blue",
	statesVisited: ["ca", "nv", "ny", "fl"],
	vin: "8AG32298%ABY",
	license: "6YXY290",
	park: function(){
		console.log("parking...");
		},
	drive: function(){
		console.log("driving...");
		}	
};

console.log(myCar.color);
myCar.park();




var a = ['1','2','3'];
var result = a.map(function (x) { 
    return "a"; 
});
result;

var a = ['1','2','3'];
var result = a.map("a");
result;