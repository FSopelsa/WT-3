// Sammansättning av en bilds url sker enligt beskrivning på
// https://www.flickr.com/services/api/misc.urls.html

// Callback-funktion för Flickr API
function jsonFlickrApi(response) {
	if (response.stat != "ok") {
		document.write("Något blev fel vid anropet till Flickr");
		return;
	}
	HTMLcode = ""; // Ny HTML-kod som skapas för bilderna
	for (let i = 0; i < response.photos.photo.length; i++) {
		let photo = response.photos.photo[i]; // Ett foto i svaret
		let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
						photo.id + "_" + photo.secret + "_s.jpg"; // Adress till en bild
		let linkUrl = "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id; // Länkadress till bilden i flickr
		HTMLcode += "<p><img alt='" + photo.title + "' src='" + imgUrl + "'><a href='" + linkUrl +"' target='_blank'>" + photo.title + "</a></p>";
	} // End for
	document.write(HTMLcode);
} // End jsonFlickrApi
