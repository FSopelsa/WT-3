// Globala variabler
var infoElems;			//Referens till	hela informationsrutan
var titleElem ;			//Referens till där titel syns
var genreElem;			//Referens till där genre syns
var yearElem;			//Referens till där utgivningsår syns
var developerElem;		//Referens till där utvecklare syns
var metascoreElem;		//Referens till där metascore syns
var playerVersus;		//Referens till där versus syns
var numberOfPlayers;	//Referens till där antal spelare syns
var numberOfLives;		//Referens till där antal liv syns
var platformElem;		//Referens till där platformar syns
var moreinfoElem;		//Referens till där länk syns
var imgIx;				//Referens till vilken bild som klickas på
//________________________________________________________________________________________________________________________\\
// Initiering av lokal variabel "gallery" samt händelsehanterare
function init() {
	let gallery = new ImageViewer("imgViewer");				// Lokal variabel som objektets instans sparas i
	let imgElems = document.querySelectorAll("main div:first-of-type a");
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("click",function() { gallery.requestJSON(this.id); }); // Klick gör att hela JSON-filen hämtas
		imgElems[i].style.cursor = "pointer";
	}
} // End init
window.addEventListener("load",init);

  //--------------------------------------------------------------------------------------------------------------------\\
 //____________________________________________---/\OBJEKTET ImageViewer/\---____________________________________________\\
//-Constructor för objektet ImageViewer______________________________________________-Constructor för objektet ImageViewer\\
function ImageViewer(id) {
	this.infoElems = document.getElementById("infoElems").querySelectorAll("p");
	this.titleElem = document.getElementById("title");
	this.genreElem = document.getElementById("genre");
	this.yearElem = document.getElementById("year");
	this.developerElem = document.getElementById("developer");
	this.metascoreElem = document.getElementById("metascore");
	this.playerVersus = document.getElementById("playerVersus");
	this.numberOfPlayers = document.getElementById("numberOfPlayers");
	this.numberOfLives = document.getElementById("numberOfLives");
	this.platformElem = document.getElementById("platform");
	this.moreinfoElem = document.getElementById("moreinfo");
	this.urlElem = document.getElementById("url");
} // End ImageViewer
 //________________________________________________________________________________________________________________________\\
//-Gör ett Ajax-anrop för att läsa in begärd fil______________________________-Gör ett Ajax-anrop för att läsa in begärd fil\\
ImageViewer.prototype.requestJSON = function(imgId) { // Parametern nr används i url:en för den fil som ska läsas in
	let self = this;		// Sparar this i en lokal variabel så att den kan användas för metodsanrop längre ned
	imgIx = imgId;      // Sparar vilken bild som är klickad på i variabeln imgIx
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","json/storyDriven.json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) self.showInfo(request.responseText, imgIx); // status 200 (OK) --> filen fanns
			else document.getElementById("infoElems").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages
 //________________________________________________________________________________________________________________________\\
//-Tolka XML-koden från den begärda filen___________________________________________-Tolka JSON-koden från den begärda filen\\
ImageViewer.prototype.showInfo = function(JSONtext, imgIx) { 		   // Parametern JSONtext är hela den inlästa JSON-koden
	let games = JSON.parse(JSONtext).game;			  	  	 // Lokal variabel där vald JSON-info sparas
	let clickedGame = games[imgIx];
	this.titleElem.innerHTML =  "  " + clickedGame.title; 						// Titel läggs in
	this.genreElem.innerHTML = " " + clickedGame.genre; 							// Genre läggs in
	this.yearElem.innerHTML = " " + clickedGame.year; 							// Utgivningsår läggs in
	this.developerElem.innerHTML = " " + clickedGame.developer; 					// Utveklare läggs in
	this.metascoreElem.innerHTML = " " + clickedGame.metascore; 					// Metascore läggs in
	this.platformElem.innerHTML = " " + clickedGame.platform; 					// Platformar läggs in
	this.playerVersus.innerHTML = " " + clickedGame.rules.playerVersus; 			// Versus läggs in
	this.numberOfPlayers.innerHTML = " " + clickedGame.rules.numberOfPlayers; 	// Antal spelare läggs in
	this.numberOfLives.innerHTML =  " " + clickedGame.rules.numberOfLives; 		// Antal liv läggs in
	this.moreinfoElem.innerHTML = " " + clickedGame.moreinfo.url; 					// Länk läggs in
	this.moreinfoElem.setAttribute('href', clickedGame.moreinfo.url); 				// Länk görs klickbar
} // End getImages
 //________________________________________________________________________________________________________________________\\