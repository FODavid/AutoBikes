var rootURL = "http://localhost:8080/AutoBikes/rest/bikes";


//anonymous function
var findAll=function(){

	$.ajax({type:'GET',url:rootURL,dataType:"json",success:renderList});
}



//[{..}, {...},...]  array of objects
var renderList = function(data){
	$.each(data, function(index, bike){
		$('#table_body').append('<tr><td>'+bike.name+'</td><td>'+bike.make+'</td><td>'+bike.model+'</td><td>'+bike.year+'</td><td>'+bike.price+'</td><td>'+bike.colour+'</td><td>'+bike.region+'</td></tr>');		
	});	
	$('#table_id').dataTable();
}

//jQuery object is $
$(document).ready(function(){
	//When DOM is loaded
	//Add event handler for click on link
	//$(document).on(event,selector,function);
	//this means "this object" which will be an a element
	//<a href="#" id="4">name</a> this.id =4
	$(document).on("click","#bikeList a",function(){findById(this.id);});
	findAll();
});
