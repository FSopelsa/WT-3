// Kod baserad på:
// Refnes Data. w3schools.com, Google Maps API, https://www.w3schools.com/graphics/google_maps_intro.asp
// Google Developers. Google Maps JavaScript API, https://developers.google.com/maps/documentation/javascript/

// Globala variabler
var myMap;	// Objekt för kartan

// Initiering av programmet
function init() {
	initMap();
}
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById("map"),
			{
				center: {lat:56.855824, lng:14.828840},
				zoom: 16,
				/* mapTypeId: "satellite", */
				styles: [
					{
						featureType: "poi",
						stylers: [{visibility:"off"}]  // Turn off points of interest
					},
					{
						featureType: "transit.station",
						stylers: [{visibility:"off"}]  // Turn off bus stations, etc.
					}
				]
			}
		);
} // End initMap
