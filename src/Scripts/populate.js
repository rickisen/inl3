'use strict'

var currentView = ''; 
var currentCollection = ''; 

$(document).ready(function(){
	currentView = $('main').attr('view')

	if (currentView == 'products') {
		loadCollection('munk'); 
		$('article > h2').click(function(){loadCollection('munk')})
	}
}); 

function loadCollection(collection, element = "" ) {
	currentCollection = collection; 
	$.getJSON('/?/api/' + collection + '/' + element, populateCollection);
}

function loadElement(event) {
	let element = event.currentTarget.getAttribute('element-id'); 
	$.getJSON('/?/api/' + currentCollection + '/' + element, populateElement);
}

function populateCollection(data){
	// first clear it of any currently displayed sections
	clearArticle();

	let article = $('article'); 
	// loop through the data and populate the article with it.
	for ( var i = 0, len = data.length; i < len; i++ ) {
		let newSection = $('<section></section>'); 
		newSection.attr('element-id', data[i]['id']); 
		newSection.append('<h3>' + data[i]['title'] + '</h3>');
		newSection.append('<p>' + data[i]['description'] + '</p>');

		// adds a listner to the section to load a full articel.
		newSection.click(loadElement); 
		
		article.append(newSection); 
	}
}

function populateElement(data) {
	// make sure data is not an array
	if ($.isArray(data)) {
		data = data[0]; 
	}
	
	clearArticle();

	var newSection = $('<section/>')
	newSection.attr('element-id', data['id']); 
	newSection.append('<h3>' + data['title'] + '</h3>');
	newSection.append($('<div class="imageDiv"/>').css('background-image','url(' + data['imgUrl'] + ')')); 
	newSection.append('<p>' + data['content'] + '</p>');

	$('article').append(newSection); 
}

function clearArticle() {
	var oldSections = $('article').find('section'); 
	for (var i = 0, len = oldSections.length; i < len; i++) {
		oldSections[i].remove(); 
	}
}

// function loadSection(event) {
// 	var li = event.target ;
// 	$.getJSON('/?/api/section/' + li.getAttribute('section-id'), function(data){
// 		main.getElementsByTagName('article')[0].getElementsByTagName("h2")[0].textContent = data['title']; 
// 		loadCollection(data['primaryContent']); 
// 	}); 
// }
