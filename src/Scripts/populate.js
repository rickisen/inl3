'use strict'

var main = document.getElementsByTagName('main')[0];

loadSections();
loadMunks();

function loadSections() {
	loadJson('/?/api/Sections', function(json){
		let data = JSON.parse(json);
		let ul = document.getElementsByTagName('header')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0]; 
		
		for ( var i = 0, len = data.length; i < len; i++ ) {
			let li = ul.getElementsByTagName('li')[i]; 
			if ( ! li ) {
				li = ul.getElementsByTagName('li')[0].cloneNode(true); 
				ul.appendChild(li); 
			}

			li.textContent = data[i]['name']; 
		}
	}); 
}

function loadMunks() {
	loadJson('/?/api/Munks', function(json){
		let data = JSON.parse(json);
		let article = main.getElementsByTagName('article')[0]; 
		article.getElementsByTagName("h2")[0].textContent = "Munkar"; 

		for ( var i = 0, len = data.length; i < len; i++ ) {
			let section = article.getElementsByTagName('section')[i]; 
			if ( ! section ) {
				section = article.getElementsByTagName('section')[0].cloneNode(true); 
				article.appendChild(section); 
			}

			let title = section.getElementsByTagName('h3')[0]; 
			let paragraf = section.getElementsByTagName('p')[0];

			title.textContent = data[i]['name']; 
			paragraf.textContent  = data[i]['price']; 
		}
	});
}

function loadJson(query, callback){
	var http_request = new XMLHttpRequest();

	http_request = new XMLHttpRequest();

	http_request.onreadystatechange = function(){
		if ( http_request.readyState == 4 && http_request.status == 200 ){
			callback(http_request.responseText);
		}
	}

	http_request.open('GET', query, true);
	http_request.send();
}

