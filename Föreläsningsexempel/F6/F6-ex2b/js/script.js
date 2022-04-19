// Globala variabler
var myMap;			// Objekt för kartan
var myMarkers = [];	// Array med markeringar

// Initiering av programmet
function init() {
	document.getElementById("showMarkersBtn").addEventListener("click",showMarkers);
	document.getElementById("hideMarkersBtn").addEventListener("click",hideMarkers);
	initMap();
}
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:56.855824, lng:14.828840},
				zoom: 16,
				styles: [
					{
						featureType:"poi",
						stylers: [{visibility:"off"}]  // Turn off points of interest
					},
					{
						featureType:"transit.station",
						stylers: [{visibility:"off"}]  // Turn off bus stations, etc.
					}
				]
			}
		);
	// Skapa objekt för markeringar
	let newMarker = new google.maps.Marker(
			{
				position: {lat:56.854505, lng:14.830466},
				title:"Huvudbyggnaden"
			}
		);
	myMarkers.push(newMarker);
	newMarker = new google.maps.Marker(
			{
				position: {lat:56.855670, lng:14.828648},
				title:"D-huset"
			}
		);
	myMarkers.push(newMarker);
} // End initMap

// -----------------------------------------------------------------------------------------

// Visa markeringar
function showMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(myMap);
	}
} // End showMarkers

// Dölj markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
} // End hideMarkers
