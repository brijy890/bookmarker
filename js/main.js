//Listen for form submit

document.getElementById("myForm").addEventListener('submit', saveBookmarks);

// save bookmarks
function saveBookmarks(e){
	// get form values
	var siteName 	= document.getElementById("siteName").value;
	var siteURL 	= document.getElementById("siteurl").value;

	if (!validateForm(siteName, siteURL)) {

		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	console.log(bookmark);

	
	// // Local storage
	// localStorage.setItem('test','Hello world');
	// console.log(localStorage.getItem('test','Hello world'));
	// // localStorage.removeItem('test','Hello world');
	// // console.log(localStorage.getItem('test','Hello world'));
	

	// Test if bookmark is null
	if (localStorage.getItem('bookmarks') == null) {
		// init array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		// set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
		// get bookmarks from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));


		// add to array

		bookmarks.push(bookmark);

		// Re-set localstorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();

	//Re-fetch bookmark
	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();

	
}


function fetchBookmarks(){

	// get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// get output id
	var bookmarksResult = document.getElementById('bookmarksResults');

	// //build output

	bookmarksResults.innerHTML = '';

	for(var i=0; i<bookmarks.length; i++){

		var name = bookmarks[i].name;
		var url  = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
										' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
										'</h3>'+
										'</div>';

	}

}

// Delete bookmark
function deleteBookmark(url){

	// get bookmarks from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through localstorage
	for(var i=0; i<bookmarks.length; i++){

		if (bookmarks[i].url == url) {

			//Remove url
			bookmarks.splice(i,1);
		}
	}

	// Re-set to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Re-fetch bookmark
	fetchBookmarks();
}

function validateForm(siteName, siteURL){

	if (!siteName || !siteURL) {

		alert("Please fill the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if (!siteURL.match(regex)) {

		alert("Please use valid url");
		return false;
	}

	return true;

}