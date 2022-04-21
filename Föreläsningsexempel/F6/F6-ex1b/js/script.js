// Globala variabler
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen API key
var flickrImgElem;	// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	flickrImgElem = document.getElementById("flickrImg");
	document.getElementById("newImgsBtn").addEventListener("click",requestNewImgs);
}
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Ajax-begäran av nya bilder
function requestNewImgs() {
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","https://api.flickr.com/services/rest/?api_key=" + myApiKey + "&method=flickr.photos.search&tags=cat&per_page=500&format=json&nojsoncallback=1",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) newImgs(request.responseText);
			else flickrImgElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestNewImgs

// Tolka svaret och visa upp bilderna. Välj 5 slumpmässigt ur de 500.
function newImgs(response) {
	response = JSON.parse(response);
	HTMLcode = ""; // Ny HTML-kod som skapas för bilderna	
	for (let i = 0; i < 5; i++) {
		let ix = Math.floor(response.photos.photo.length * Math.random()); // Slumpmässigt index till ett foto
		let photo = response.photos.photo[ix]; // Ett foto i svaret
		let imgUrl = "https://live.staticflickr.com/" + photo.server + "/" +
					photo.id + "_" + photo.secret + "_s.jpg"; // Adress till en bild
		let linkUrl = "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id; // Länkadress till bilden i flickr
		HTMLcode += "<p><img alt='" + photo.title + "' src='" + imgUrl + "'><a href='" + linkUrl +"' target='_blank'>" + photo.title + "</a></p>";
	} // End for
	flickrImgElem.innerHTML = HTMLcode;
} // End newImgs