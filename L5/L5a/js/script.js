// Initiering av lokal variabel "gallery" samt händelsehanterare
function init() {
	let gallery = new ImageViewer("imgViewer");				// Lokal variabel som objektets instans sparas i
	document.querySelector("#categoryMenu").addEventListener("change", 
			function() {
				gallery.requestImages("xml/images" + this.selectedIndex + ".xml",);
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click",function() { gallery.prevImage(); });
	document.querySelector("#nextBtn").addEventListener("click",function() { gallery.nextImage(); });
} // End init
window.addEventListener("load",init);

  //--------------------------------------------------------------------------------------------------------------------\\
 //____________________________________________---/\OBJEKTET ImageViewer/\---____________________________________________\\
//-Constructor för objektet ImageViewer______________________________________________-Constructor för objektet ImageViewer\\
function ImageViewer(id) {
	this.titleElem = document.querySelector("#" + id + " h3");	// Referens till h3-element för bildspelets titel
	this.imgElem = document.querySelector("#" + id + " img");	// Referens till img-element för bildspelet
	this.captionElem = document.querySelector("#" + id + " p");	// Referens till p-element för bildtext
	this.list = [												// Lista där bilders url och caption senare ska pushas in
		{url: "img/blank.png",  // Initiera med den tomma bilden
		 caption: ""			// Tom bildtext för den tomma bilden
		}
	];
	this.imgIx = 0;											// Index för aktuell bild
	this.timer = null;										// Referens till timern för bildspelet			
	this.showImage();
} // End ImageViewer
 //________________________________________________________________________________________________________________________\\
//-Gör ett Ajax-anrop för att läsa in begärd fil______________________________-Gör ett Ajax-anrop för att läsa in begärd fil\\
ImageViewer.prototype.requestImages = function(file) { // Parametern nr används i url:en för den fil som ska läsas in
	let self = this;		// Sparar this i en lokal variabel så att den kan användas för metodsanrop längre ned
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) self.getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages
 //________________________________________________________________________________________________________________________\\
//-Tolka XML-koden från den begärda filen____________________________________________-Tolka XML-koden från den begärda filen\\
ImageViewer.prototype.getImages = function(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	this.imgUrls = [];		// Ny tom array för bilder
	let imgUrls = XMLcode.getElementsByTagName("url"); // Alla url-element
	this.imgCaptions = [];	// Ny tom array för bildtexter
	let imgCaptions = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	this.imgIx = 0;			// Index för aktuell bild
	this.list = [];			// Tömmer arrayen för att fylla på med vald kategori
	for (let i = 0; i < imgUrls.length; i++) {
		let image = {
			url: imgUrls[i].firstChild.data,  				 // Initiera med den tomma bilden
			caption: imgCaptions[i].firstChild.data			 // Tom bildtext för den tomma bilden
		};
		this.list.push(image);
	}
	this.showImage();
} // End getImages
 //________________________________________________________________________________________________________________________\\
//-Visa bilden med index imgIx__________________________________________________________________-Visa bilden med index imgIx\\
ImageViewer.prototype.showImage = function() {
	this.imgElem.src = this.list[this.imgIx].url;
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list[this.imgIx].caption;
} // End showImage
 //________________________________________________________________________________________________________________________\\
//-Visa föregående bild________________________________________________________________________________-Visa föregående bild\\
ImageViewer.prototype.prevImage = function() {
	if (this.imgIx > 0) this.imgIx--;
	else this.imgIx = this.list.length - 1; // Gå runt till sista bilden
	this.showImage();
} // End prevImage
 //________________________________________________________________________________________________________________________\\
//-Visa nästa bild__________________________________________________________________________________________-Visa nästa bild\\
ImageViewer.prototype.nextImage = function() {
	if (this.imgIx < this.list.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	this.showImage();
} // End nextImage
 //________________________________________________________________________________________________________________________\\