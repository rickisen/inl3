'use strict'
var products = []; 

$(document).ready(function(){
    // populate the munk selects/options with munks
    $.getJSON('/?/api/munk', fillOptions); 

    // updates the displayed prices whenever a new 
    // product is selected or quantity altered
    $('#products select').change(updateProductInfo); 
    $('#products input').change(updatePrices); 

    // Adds ability to add a new section in the form so 
    // that we can order multiple sorts of munks
    $('#newProductSection').click(addNewProductSection); 
});

// function that populates the first select 
// with all the products from the db
function fillOptions(data) {	
    var selectToFill = $('#products select'); 

    for (var i = 0, len = data.length; i < len; i++) {
        $('<option value="' + data[i].id + '">' + data[i].title + '</option>').appendTo('#products select'); 
    }

    // Get the price of the first product, So we can display an initial price.
    fetchProductInfo(data[0].id); 
}

function addNewProductSection(event) {
    // add a new product section by cloning the last one
    // and insert it between the last product and the add button
    $('#products section').last().clone().insertAfter($('#products section').last()); 
    var newSection = $('section').last(); 

    // itterate that section's product index, so that we can handle it correctly in backend
    var newProductIndex = Number(newSection.attr('product_index')) + 1; 
    newSection.attr('product_index', newProductIndex); 


    // set the correct new index for the name that is sent to backend
    // and add listners so the price gets update when user changes the inpus/selects
    var newSelect = newSection.find('select');
    newSelect.attr('name', 'products[' + newProductIndex + '][id]'); 
    newSelect.change(updateProductInfo); 

    var newInput  = newSection.find('input');
    newInput.attr('name', 'products[' + newProductIndex + '][ammount]'); 
    newInput.change(updatePrices); 

    // lastly we need to recalulate the prices, sinve there is a new munk in town
    fetchProductInfo(newProductIndex); 
}

function fetchProductInfo(productId) {
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

function updateProductInfo(event) {
    var productId = $(event.currentTarget).val(); 
    fetchProductInfo(productId);
}

function updatePrices() {
    var sections = $('#products section'); 
    var calculatedPrices = []; 

    // loop through all sections and update their price
    sections.each(function(index){
        let currentProductId = Number($(this).find('select').val());
        let priceMultiplier  = Number($(this).find('input').val()); 

        console.log(this);
        console.log(products);
        console.log(currentProductId);
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
