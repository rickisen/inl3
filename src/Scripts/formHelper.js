'use strict'
var products = [{}];

$(document).ready(function(){
	// populate the munk selects/options with 
	// munks, and save them globaly
	$.getJSON('/?/api/munk', fillOptions); 

	// updates the displayed prices whenever a new 
	// product is selected or quantity altered
	$('#products select').change(updateProductInfo); 
	$('#products input').change(updatePrices); 

	// Adds ability to add a new section in the form so 
	// that we can order multiple sorts of munks
	$('#newProductSection').click(addNewProductSection); 
});

function addNewProductSection(event) {
	// add a new product section by cloning the last one
	// and insert it between the last product and the add button
	$('#products section').last().clone().insertAfter($('#products section').last()); 
	var newSection = $('section').last(); 

	// itterate that section's product index
	var newProductIndex = Number(newSection.attr('product_index')) + 1; 
	newSection.attr('product_index', newProductIndex); 
	newSection.find('select').attr('name', 'products[' + newProductIndex + '][name]'); 
	newSection.find('input').attr('name', 'products[' + newProductIndex + '][ammount]'); 
	newSection.change(updateProductInfo); 
}

// function that populates the first select 
// with all the products from the db
function fillOptions(data) {	
	var selectToFill = $('#products select'); 

	for (var i = 0, len = data.length; i < len; i++) {
		$('<option value="' + data[i].id + '">' + data[i].title + '</option>').appendTo('#products select'); 
	}
}

function updateProductInfo(event) {
	var productId = $(event.currentTarget).val(); 

	// only download new data, if we dont already have it
	if (!products[productId]) {
		$.getJSON('/?/api/munk/' + productId, function(data){
			products[productId] = data; 
			updatePrices(); 
		})
	} else {
		updatePrices(); 
	}
}

function updatePrices() {
	var sections = $('#products section'); 
	var calculatedPrices = []; 

	// loop through all sections and update their price
	sections.each(function(index){
		let currentProductId = Number($(this).find('select').val());
		let priceMultiplier  = Number($(this).find('input').val())
		
		// calculate price
		let calculatedPrice = Number(products[currentProductId].price) * priceMultiplier ;
		calculatedPrices.push(calculatedPrice);  // save it for calculating total

		// Display it 
		$(this).find('.price').text('Pris: ' + calculatedPrice);
	}); 

	var totalPrice = 0;
	for (var i = 0, len = calculatedPrices.length; i < len; i++) {
		totalPrice += calculatedPrices[i];
	}

	$('#price_total').text('Pris: ' + totalPrice); 
}
