// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
const markerData = [	// Data för markeringar
	{position: {lat:56.854505, lng:14.830466}, title:"Huvudbyggnaden"},
	{position: {lat:56.855670, lng:14.828648}, title:"D-huset"}
];
var infoWindow;			// Inforuta i kartan
var userMarker;			// Markering för plats där användaren klickar i kartan

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
		google.maps.event.addListener(newMarker,"click",showInfoWindow);
	}
	infoWindow = new google.maps.InfoWindow();
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// -----------------------------------------------------------------------------------------

// Visa markeringenstitel i ett infofönster
function showInfoWindow() {
	infoWindow.setContent("Detta är "+this.title); // this är den marker som användaren klickat på
	infoWindow.open(myMap,this);
} // End showInfoWindow

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	//userMarker.setPosition({lat:e.latLng.lat(),lng:e.latLng.lng()});
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
} // End newUserMarker

// Visa markeringar
function showMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(myMap);
	}
} // End showMarkers

// Dölj markeringar
function hideMarkers() {
	infoWindow.close(); // Dölj även infofönstret
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers
