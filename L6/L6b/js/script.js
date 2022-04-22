// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position: {lat:56.855780, lng:14.828423}, title:"D-huset"},
			{position: {lat:56.841219, lng:14.825604}, title:"Bilverkstad"},
			{position: {lat:56.851941, lng:14.820576}, title:"TC-skolan"},
			{position: {lat:56.853372, lng:14.820533}, title:"Teleborg Centrum"},
			{position: {lat:56.838363, lng:14.841762}, title:"Skir gamla skola"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	let btnElems = document.getElementById("addrBtns").getElementsByTagName("button");
	for (let i = 0; i < markerData.length; i++) {
	btnElems[i].innerText =  markerData[i].title;
	btnElems[i].addEventListener("click",showAddrMarker);
	btnElems[i].setAttribute("data-ix",[i]);			//Sparar [i](0-4) som attribut i knapparna
	}
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:56.847881, lng:14.8263},
				zoom: 13.6,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	let mylatLng = JSON.stringify(e.latLng);		// Sparar markörens latLng i textform
	mapLocationElem.innerHTML = "Latitud: " + JSON.parse(mylatLng).lat + " Longitud: " + JSON.parse(mylatLng).lng; 
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(myMarkers[this.getAttribute("data-ix")].position); //Tar fram postion från knapp indexerad med "data-ix"
	userMarker.setMap(myMap);
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
