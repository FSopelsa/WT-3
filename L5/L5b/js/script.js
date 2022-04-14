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
function init() {
	infoElems = document.getElementById("infoElems").querySelectorAll("p");
	titleElem = document.getElementById("title");
	genreElem = document.getElementById("genre");
	yearElem = document.getElementById("year");
	developerElem = document.getElementById("developer");
	metascoreElem = document.getElementById("metascore");
	playerVersus = document.getElementById("playerVersus");
	numberOfPlayers = document.getElementById("numberOfPlayers");
	numberOfLives = document.getElementById("numberOfLives");
	platformElem = document.getElementById("platform");
	moreinfoElem = document.getElementById("moreinfo");
	urlElem = document.getElementById("url");
	let imgElems = document.querySelectorAll("main div:first-of-type a");
	for (let i = 0; i < imgElems.length; i++) {
		imgElems[i].addEventListener("click",requestJSON); // Klick gör att hela JSON-filen hämtas
		imgElems[i].style.cursor = "pointer";
	}
} // End init
window.addEventListener("load",init);
 //________________________________________________________________________________________________________________________\\
//-Gör ett Ajax-anrop för att läsa in begärd fil______________________________-Gör ett Ajax-anrop för att läsa in begärd fil\\
function requestJSON () { // Parametern nr används i url:en för den fil som ska läsas in
	imgIx = this.id;      // Sparar vilken bild som är klickad på i variabeln imgIx
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","json/storyDriven.json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) showInfo(request.responseText, imgIx); // status 200 (OK) --> filen fanns
			else document.getElementById("infoElems").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages
 //________________________________________________________________________________________________________________________\\
//-Tolka XML-koden från den begärda filen___________________________________________-Tolka JSON-koden från den begärda filen\\
function showInfo(JSONtext, imgIx) { 		   // Parametern JSONtext är hela den inlästa JSON-koden
	let games = JSON.parse(JSONtext).game;			  	  	 // Lokal variabel där vald JSON-info sparas
	clickedGame = games[imgIx];
	titleElem.innerHTML =  "  " + clickedGame.title; 						// Titel läggs in
	genreElem.innerHTML = " " + clickedGame.genre; 							// Genre läggs in
	yearElem.innerHTML = " " + clickedGame.year; 							// Utgivningsår läggs in
	developerElem.innerHTML = " " + clickedGame.developer; 					// Utveklare läggs in
	metascoreElem.innerHTML = " " + clickedGame.metascore; 					// Metascore läggs in
	platformElem.innerHTML = " " + clickedGame.platform; 					// Platformar läggs in
	playerVersus.innerHTML = " " + clickedGame.rules.playerVersus; 			// Versus läggs in
	numberOfPlayers.innerHTML = " " + clickedGame.rules.numberOfPlayers; 	// Antal spelare läggs in
	numberOfLives.innerHTML =  " " + clickedGame.rules.numberOfLives; 		// Antal liv läggs in
	moreinfoElem.innerHTML = " " + clickedGame.moreinfo; 					// Länk läggs in
	moreinfoElem.setAttribute('href', clickedGame.moreinfo); 				// Länk görs klickbar
} // End getImages
 //________________________________________________________________________________________________________________________\\