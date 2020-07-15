var rootURL = "http://localhost:8080/AutoBikes/rest/bikes";

var currentBike = {};


var search = function(searchKey){
	if (searchKey == '')
		findAll();
	else
		findByName(searchKey);
};

var newBike=function(){
	//$('#btnDelete').hide();
	currentBike = {};
	renderDetails(currentBike);
	$('#myModal').modal('show');
};


// anonymous function
var findAll=function(){
   console.log('findAll');
	$.ajax({
		type:'GET',
		url:rootURL,
		dataType:"json",
		success:renderList
		});
};

var findByName = function(searchKey){
	console.log('findByName:' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderSearchList,
	});
};

var findById=function(id){ 
	console.log('findById: ' + id);
	$.ajax({
		    type:'GET',
			url:rootURL + '/' + id,
			dataType:"json",
			success: function (data){
				$('#btnDelete').show();
				console.log('findById success: ' + data.name);
			currentBike=data;
			renderDetails(currentBike);
			}
	});
};


var addBike = function(){
	var bikeToBeAddedObject = JSON.parse(formToJSON());
	bikeToBeAddedObject["id"] = "0";
	var bikeToBeAddedJson = JSON.stringify(bikeToBeAddedObject);
	$.ajax({
	type: 'POST',
	contentType: 'application/json',
	url: rootURL,
	dataType: "json",
	data: bikeToBeAddedJson,
	success: function(data, textStatus, jqXHR){
	alert('Bike created Successfully');
	$('#btnDelete').show();
	$('#bikeId').val(data.id);
                findAll();
	},
	error: function(jqXHR, textStatus, errorThrown){
	alert('addBike error: ' + textStatus);
	}
	});
	};
	
	var updateBike= function(){
		console.log('updateBike');
		$.ajax({
			type: 'PUT',
			contentType: 'application/json',
			url: rootURL + '/' + $('#bikeId').val(),
			dataType: "json",
			data: formToJSON(),
			success: function(data, textStatus, jqXHR){
				alert('Bike updated successfully');
				findAll();
			},
			error: function(jqXHR, textStatus, errorThrown ){
				alert('updateBike error: ' + textStatus);
			}
			
		});
	};
	
	var deleteBike=function(id) {
		console.log('deleteBike');
		$.ajax({
			type: 'DELETE',
			url: rootURL + '/' + id,
			success: function(data, textStatus, jqXHR){
				$('#bikeId').val('');
				alert('Bike deleted successfully');
	                         findAll();
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('deleteBike error');
			}
		});
	};
	
	// to render the search function//
	
	var renderSearchList = function(data){
		var list = data;
		$('#bikeList li').remove();
		$.each(list, function(index, bike){
			$('#bikeList').append('<li><a href="#" id="'+bike.id+'">'+bike.name+'</a></li>');	
			
		});
	};

//[{..}, {...},...] array of objects
var renderList = function(data){
	if ( $.fn.DataTable.isDataTable('#table_id') ) {
		  $('#table_id').DataTable().destroy();
		}	
	var list = data;
	$('#bikeList li').remove();
	$('#table_body').html('');
	$('#product_grid').html('');
	$.each(list, function(index, bike){
		//$('#bikeList').append('<li><a href="#" id="'+bike.id+'">'+bike.name+'</a></li>');		
		var editButtonString = `<button class ="edit-autobike btn btn-info btn-lg"` +
		`data-id=${bike.id} `+ 
		`data-name ="${bike.name}" data-make="${bike.make}" `+
		`data-model="${bike.model}" data-region="${bike.region}" `+
		`data-colour="${bike.colour}" data-year="${bike.year}" `+
		`data-price= ${bike.price} data-country="${bike.country}" `+
		`data-picture="${bike.picture}" data-specification="${bike.specification}" ` +
		`data-toggle="modal" data-target ="#myModal">Edit</button>`;
		var deleteButtonString = `<button class="delete-bike btn btn-info btn-lg" style="background: #bb0000" id="btnDelete" `+
		`data-id=${bike.id} > Remove</button>`;
		$('#table_body').append('<tr><td>'+bike.name+'</td><td>'+bike.make+'</td><td>'+bike.model+'</td><td>'+bike.year+'</td><td>'
				+bike.price+'</td><td>'+bike.colour+'</td><td>'+bike.region+'</td>'+'<td>'+editButtonString
				+'</td><td>' + deleteButtonString + '</td></tr>');
	    $('#product_grid').append('<div class="col-sm-6 colm-4 col-lg-3 product">'+
            '<div class="item">'+
                '<div>'+ 
                '<img class="prod_image" src="pics/'+bike.picture+'">'+
                '</div>'+
                '<div>'+
                    '<p class="title">Name: '+bike.name+'</p>'+
                    '<p class="title">Make: '+bike.make+'</p>'+
                    '<p class="title">Model: '+bike.model+'</p>'+
                    '<p class="title">Price: '+bike.price+'</p>'+
                '</div>'+
            '</div>'+
        '</div>');
	});	
	$('#table_id').dataTable();
};
	
var renderDetails=function(bike){
console.log("renderDetails");
	// bike.name
	$('#bikeId').val(bike.id);
	$('#name').val(bike.name);
	$('#make').val(bike.make);
	$('#model').val(bike.model);
	$('#region').val(bike.region);
	$('#colour').val(bike.colour);
	$('#year').val(bike.year);
	$('#price').val(bike.price);
	// ..
	$('#country').val(bike.country);
	// image
	$('#pic').attr('src','pics/'+bike.picture);
	$('#specification').val(bike.specification);
};

var formToJSON=function () {
	var  bikeId = $('#bikeId').val();
	return JSON.stringify({
		"id": bikeId == "" ? null : bikeId, 
		"name": $('#name').val(), 
		"make": $('#make').val(),
		"model": $('#model').val(),
		"region" : $('#region').val(),
		"colour" : $('#colour').val(),
		"year" :  $('#year').val(),
		"price" : $('#price').val(),
		"country": $('#country').val(),
		"picture": "",
		"specification": $('#specification').val()
		});
};

$(document).ready(function(){
	
	$(document).on("click", '#bikeList a', function(){findById(this.id);});
	// Replace broken images with generic wine bottle
	
	//reset form
	findAll();
	
});



// jQuery object is $
//When the DOM is ready.
$(document).ready(function(){
	
	// Nothing to delete in initial application state
	$('#btnDelete').hide();
	
	
	// Register listeners
	$('#btnSearch').click(function() {
		search($('#searchKey').val());
		return false;
	});
	

	// Trigger search when pressing 'Return' on search key input field
	$('#searchKey').keypress(function(e){
		if(e.which == 13) {
			search($('#searchKey').val());
			e.preventDefault();
			return false;
	    }
	});

	$('#btnAdd').click(function() {
		newBike();
		return false;
	});
	
	$('#btnSave').click(function(event) {
		if ($('#bikeId').val() == '')
			addBike();
		else
			updateBike();
		
		return false;
	});


	$(document).on("click", "#btnDelete", function(event) {
		var idToDelete = event.target.dataset.id;
		var confirmation = confirm("Confirm Delete?");
		if(confirmation){
			deleteBike(idToDelete);
			//alert("about to delete");
		}
		
		return false;
	});
	
	
	
	$(document).on("click", "#table_body .edit-autobike", function(source){
		element = source.target;
		var currentAutobike = {"id":element.dataset.id, "name":element.dataset.name, "make":element.dataset.make, "model":element.dataset.model, "region":element.dataset.region,
				"colour":element.dataset.colour, "year":element.dataset.year, "price":element.dataset.price, "country":element.dataset.country, "picture":element.dataset.picture,
				"specification":element.dataset.specification};
		renderDetails(currentAutobike);
		$('#myModal').modal('show');
		
	});


	
//	$(document).on("click", '#bikeList a', function(){findById(this.id);});
//
//	// Replace broken images with generic wine bottle
//	
//	//reset form
//	$('#bikeId').val("");
//	$('#name').val("");
//	$('#make').val("");
//	$('#model').val("");
//	$('#region').val("");
//	$('#colour').val("");
//	$('#year').val("");
//	$('#price').val("");
//	$('#country').val("");
//	$('#pic').attr('src', "");
//	$('#specification').val("");
//	findAll();
	
	
	
});






	
	
	
