// Globala variabler
	// Referens till element för bildspelets titel
	// Referens till img-element för bildspelet
	// Referens till element för bildtext
	// Array med url:er för valda bilder
	// Array med bildtexter till valda bilder
	// Index för aktuell bild
	// Referens till timern för bildspelet

// Initiering av globala variabler och händelsehanterare
function init() {
	titleElem = document.querySelector("#imgViewer h3");
	imgElem = document.querySelector("#imgViewer img");
	captionElem = document.querySelector("#imgViewer p");
	imgUrls = ["img/blank.png"]; // Initiera med den tomma bilden
	imgCaptions = [""]; // Tom bildtext för den tomma bilden
	imgIx = 0;
	timer = null;
	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
 //-------------GÖR OM SÅ REFERERAR TILL METODERNA ISTÄLLET FÖR GAMLA FUNKTIONER------------\\
//-------------"Använd variabeln för instansen, för att referera till objektet."-------------\\
	document.querySelector("#prevBtn").addEventListener("click",prevImage);
	document.querySelector("#nextBtn").addEventListener("click",nextImage);
	
	// let self = this
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner/metoder för bildspelet -----    			  -_-OBJEKTET-_-
//																				\\
function constructorFunction() {
	// Gör om till egenskaper	-	Flytta hit det som behövs från init
	titleElem;		// Referens till element för bildspelets titel
	imgElem;		// Referens till img-element för bildspelet
	captionElem;	// Referens till element för bildtext
	imgUrls;		// Array med url:er för valda bilder
	imgCaptions;	// Array med bildtexter till valda bilder
	imgIx;			// Index för aktuell bild
	timer;			// Referens till timern för bildspelet

}

         //Skriv om så att de blir metoder i objektet 

// Gör ett Ajax-anrop för att läsa in begärd fil
function requestImages(file) { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages


         //Skriv om så att de blir metoder i objektet 

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
function getImages(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	imgUrls = [];		// Nya tomma arrayer för bilder
	imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		imgUrls.push(urlElems[i].firstChild.data);
		imgCaptions.push(captionElems[i].firstChild.data);
	}
	imgIx = 0;
	showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
function showImage() {         //Skriv om så att de blir metoder i objektet 
	imgElem.src = imgUrls[imgIx];
	captionElem.innerHTML = (imgIx+1) + ". " + imgCaptions[imgIx];
} // End showImage

// Visa föregående bild
function prevImage() {         //Skriv om så att de blir metoder i objektet 
	if (imgIx > 0) imgIx--;
	else imgIx = imgUrls.length - 1; // Gå runt till sista bilden
	showImage();
} // End prevImage

// Visa nästa bild
function nextImage() {         //Skriv om så att de blir metoder i objektet 
	if (imgIx < imgUrls.length - 1) imgIx++;
	else imgIx = 0; // Gå runt till första bilden
	showImage();
} // End nextImage