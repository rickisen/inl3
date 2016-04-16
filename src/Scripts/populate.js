'use strict'

var main = document.getElementsByTagName('main')[0];
var currentCollection = "";

loadNav();

function loadNav() {
	$.getJSON('/?/api/section', populateNav); 
}

function loadSection(event) {
	var li = event.target ;
	$.getJSON('/?/api/section/' + li.getAttribute('section-id'), function(data){
		main.getElementsByTagName('article')[0].getElementsByTagName("h2")[0].textContent = data['title']; 
		loadArticle(data['primaryContent']); 
	}); 
}

function loadElement(event) {
	let element = event.currentTarget.getAttribute('element-id'); 
	$.getJSON('/?/api/' + currentCollection + '/' + element, populateArticle);
}

function loadArticle(collection, element = "" ) {
	currentCollection = collection; 
	$.getJSON('/?/api/' + collection + '/' + element, populateArticle);
}

function populateNav(data){
	let ul = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0]; 

	for ( var i = 0, len = data.length; i < len; i++ ) {
		let li = ul.getElementsByTagName('li')[i]; 
		if ( ! li ) {
			li = ul.getElementsByTagName('li')[0].cloneNode(true); 
			ul.appendChild(li); 
		}

		li.textContent = data[i]['title']; 
		li.setAttribute('section-id', data[i]['id']); 
		li.addEventListener('click',loadSection); 
	}
}

function populateArticle(data){
	if (!$.isArray(data)) {
		data = [data]; 
	}

	// first clear it of any currently displayed sections
	var oldSections = $('article').find('section'); 
	for (var i = 0, len = oldSections.length; i < len; i++) {
		oldSections[i].remove(); 
	}

	let article = $('article'); 
	// loop through the data and populate the article with it.
	for ( var i = 0, len = data.length; i < len; i++ ) {
		let newSection = $('<section></section>'); 

		$.getJSON('/?/api/' + currentCollection + '/' + data[i]['id'], function(elementData){
			newSection.attr('element-id', elementData['id']); 
			newSection.append('<h3>' + elementData['title'] + '</h3>');
			newSection.append('<p>' + elementData['description'] + '</p>');
		}); 

		// adds a listner to the section to load a full articel.
		newSection.click(loadElement); 

		article.append(newSection); 
	}
}
