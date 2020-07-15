//var xmlhttp = new XMLHttpRequest(); // creates an xmlHttpRequest object
////the onreadystatechange event is triggered every time the readyState changes
////executes a function when the readyState changes
//xmlhttp.onreadystatechange = function() {
//	//when readyState is 4 and status is 200, the response is ready
//	//the readyState property holds the status of the xmlHttpRequest
//    if (this.readyState == 4 && this.status == 200) {
//       // Typical action to be performed when the document is ready:
//    	//Transforms the data to JSON
//      var bike = JSON.parse(xmlhttp.response); 
//      var html = ''; 
//      //check the length of the content in the JSON object bike
//      //for loop that creates new table rows and adds to html variable
//      for (i=0; i<bike.length; i++){
//      // For each item within the JSON object, creates a table row and append the table row to html variable
//      html = html + '<tr><td>'+bike[i].name+'</td><td>'+bike[i].make+'</td><td>'+bike[i].model+'</td><td>'
//      +bike[i].year+'</td><td>'+bike[i].price+'</td><td>'+bike[i].colour+'</td><td>'+bike[i].region+'</td></tr>';
//      }
//      document.getElementById("table_body").innerHTML = html; //To input the html variable containing 
//                                                             //the table rows into the table body
//    }
//    else if(this.status == 400){
//    	 alert('Error 400')
//    }
//};
////To make a request to the resource API
//xmlhttp.open("GET", "http://localhost:8080/AutoBikes/rest/bikes", true);
////Sends a request to the server
//xmlhttp.send();
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
////Call the GET resource 
//fetch("http://localhost:8080/AutoBikes/rest/bikes")
//
//// This code handles the data you get from the API when the response is received 
//.then((response) => response.json()) //Transforms the data to json
//.then(function(data) {
//	var bike = data.results; //binding the JSON response result to the variable bike
//	var html='';
//	data.forEach( (item) => { //
//		var bike = item;
//		html = html +  '<tr><td>'+bike.name+'</td><td>'+bike.make+'</td><td>'+bike.model+'</td><td>'
//       +bike.year+'</td><td>'+bike.price+'</td><td>'+bike.colour+'</td><td>'+bike.region+'</td></tr>';
//		
//	});
//	console.log(html);
//	document.querySelector("#table_body").innerHTML = html;
//	
//})
//
//.catch(function(error) {
//	console.error(error); // This is where you run code if the server returns any errors
//});
//
//
//
//
//getData(function(x){ //Requesting more data from the server by calling the getData()function
//    console.log(x);
//    getMoreData(x, function(y){ //callback function, requesting for some more Data by calling the getMoreData()
//        console.log(y); 
//        getSomeMoreData(y, function(z){ //
//            console.log(z);
//        });
//    });
//});
//
//
//
//getData()
//.then((x) => {
//  console.log(x);
//  return getMoreData(x);
//})
//.then((y) => {
//  console.log(y);
//  return getSomeMoreData(y);
//})
//.then((z) => {
//  console.log(z);
// });
//
//
//
//
//
//
//
//
////Regular Callbacks
////With Callbacks, the more number of callbacks you chain, more difficult does it get to read and more difficult to debug as well.
//api1(function(result1){
//    api2(function(result2){
//        api3(function(result3){
//             // do work
//        });
//    });
//});
// 
//// Using Promises
////offer much better readability allowing you to chain as many calls as you’d like
//api1().then(function(result1){
//    return api2();
//}).then(function(result2){
//    return api3();
//}).then(function(result3){
//     // do work
//});
//
//
//
//
//
//
//
//
//
////Regular Callbacks
//api1(function(error1, result2){
//    if (error1) {
//      // log error
//    } else {
//        api2(function(error2, result2){
//            if (error2) {
//            // log error
//            } else {
//                api3(function(error, result3){
//                    if (error2) {
//                        // log error
//                    } else {
//                        // do work
//                    }
//                });
//            }
//        });
//    }   
//});
// 
//// Using Promises
//api1().then(function(result1){
//    return api2();
//}).then(function(result2){
//    return api3();
//}).then(function(result3){
//     // do work
//}).catch(function(error) {
//     //handle any error that may occur before this point
//});
//
//
//
//promises.all([api1(), api2(), api3()]).then(function(result) {
//    // Do some work. 
//    // result is an array containing values of the three fulfilled promises.
//}).catch(function(error) {
//    // Handle error
//    // Executes when at least one of the promises was rejected.
//});
//
//
//promise.then(function(result){
//    // do something
//}).catch(function(error) {
//    //handle any error that may occur before this point
//}).then(function() {
//    // do something whether there was an error or not
//});








var foo = function(){
	console.log(x); //undefined
	var x= 1;
	console.log(x); // 1
}
foo();

//
//var foo = function(){
//	var x;
//	console.log(x); //undefined
//	 x= 1;
//	console.log(x); // 1
//}
//foo();






function foo(){
	bar();
	var x= 1;
}


function foo() {
    var x;
    bar();
    x = 1;
}



function test() {
    foo(); // TypeError "foo is not a function"
    bar(); // "this will run!"
    var foo = function () { // function expression assigned to local variable 'foo'
        alert("this won't run!");
    }
    function bar() { // function declaration, given the name 'bar'
        alert("this will run!");
    }
}
test();









foo(); // TypeError "foo is not a function"
bar(); // valid
baz(); // TypeError "baz is not a function"
bin(); // ReferenceError "bin is not defined"

var foo = function () {}; // anonymous function expression ('foo' gets hoisted)
function bar() {}; // function declaration ('bar' and the function body get hoisted)
var baz = function bin() {}; // named function expression (only 'baz' gets hoisted)

foo(); // valid
bar(); // valid
baz(); // valid
bin(); // ReferenceError "bin is not defined"





















































































