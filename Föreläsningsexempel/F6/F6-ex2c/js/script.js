// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
const markerData = [	// Data för markeringar
	{position: {lat:56.854505, lng:14.830466}, title:"Huvudbyggnaden"},
	{position: {lat:56.855670, lng:14.828648}, title:"D-huset"}
];

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
					{featureType:"poi",stylers: [{visibility:"off"}]}, // No points of interest
					{featureType:"transit.station",stylers: [{visibility:"off"}]} // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
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
