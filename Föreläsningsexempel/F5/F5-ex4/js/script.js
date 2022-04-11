// Globala variabler
var courselist;	// Objekt med ämne och kurslista

// Initiering av globala variabler och händelsehanterare
function init() {
	courselist = new CourseList(""); // Skapa ett nytt tomt objekt
	document.getElementById("addBtn").addEventListener("click",function() { courselist.add(); });
	document.getElementById("writeBtn").addEventListener("click",function() { courselist.write(); });
	initSaveAndLoad();
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------
// ---------- Objektet CourseList ----------

// Constructor för objektet CourseList
function CourseList(subject) {
	this.courses = {
		subject: subject,
		list: []
	};
} // End constructor for CourseList

// Skriv ut alla kurser
CourseList.prototype.write = function() {
	let HTMLcode = "<h3>" + this.courses.subject + "</h3>"; // Sträng med HTML-kod som skapas
	for (let i = 0; i < this.courses.list.length; i++) {
		// Kursens index sparas i elementet med "x" – behövs om kursen ska tas bort
		HTMLcode += "<span data-ix='" + i + "'>x</span>" +
			"<div><strong>" + this.courses.list[i].code + " " +
			this.courses.list[i].title.swedish + "</strong>, " +
			this.courses.list[i].credits + "hp" + "<br>" +
			this.courses.list[i].title.english + "</div>";
	}
	document.getElementById("result").innerHTML = HTMLcode;
	let delBtnElems = document.querySelectorAll("#result > span"); // "Knapp" (x) för att ta bort kurs
	let self = this; // self blir en referens till objektet CourseList och kan sedan utnyttjas i händelsehanteraren nedan
	for (let i = 0; i < delBtnElems.length; i++) {
		delBtnElems[i].addEventListener("click",function(e) { self.delete(e); });
	}
} // End CourseList.prototype.write

// Skapa ett nytt kursobjekt och lägg in det i list
CourseList.prototype.addCourse = function(code, swTitle, engTitle, credits) {
	let course = {
			code: code,
			title: {
				swedish: swTitle,
				english: engTitle
			},
			credits: credits
		}
	this.courses.list.push(course);
} // End CourseList.prototype.addCourse

// Lägg till en ny kurs med data från formuläret
CourseList.prototype.add = function() {
	let formElem = document.getElementById("inputForm"); // Formulär för input av en ny kurs
	this.addCourse(formElem.courseCode.value,formElem.swedishTitle.value,
				   formElem.englishTitle.value,formElem.credits.value);
	this.write();
} // End CourseList.prototype.add

// Ta bort en kurs ur arrayen list
CourseList.prototype.delete = function(e) {
	if (confirm("Är du säker på att du vill ta bort kursen?")) {
		let ix = e.currentTarget.getAttribute("data-ix"); // Index till kurs som ska tas bort
		this.courses.list.splice(ix,1);
		this.write();
	}
} // End CourseList.prototype.delete

// ----- Funktioner för att spara och ladda kurslista som JSON i en textfil -----
// Efter fri omarbetning av exemplet på https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/

// Globala variabler
var downloadElem;	// Dolt a-element för nedladdning av en fil

// Skapa a-elementet för nedladdning samt lägg på händelsehanterare på knapparna
function initSaveAndLoad() {
	downloadElem = document.createElement("a");
	downloadElem.download = ""; // download och href tilldelas i funktionen saveCourses
	downloadElem.href = "";
	downloadElem.style.display = "none";
	document.body.appendChild(downloadElem);
	document.getElementById("saveBtn").addEventListener("click",function() { courselist.save(); });
	document.getElementById("fileToLoad").addEventListener("change",function() { courselist.load(); });
} // End initSaveAndLoad

// Spara alla kurser i en JSON-fil
CourseList.prototype.save = function() {
	let textToSaveAsBlob;	// Blob-objekt för det som ska sparas i filen
	let textToSaveAsURL;	// Blob-objektet omvandlat till url
	let filename;			// Filnamn som användaren skrivit i textfältet
	textToSaveAsBlob = new Blob([JSON.stringify(this.courses)],{type:"text/plain;charset=utf-8"});
	textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	filename = document.getElementById("fileToSave").value;
	if (filename != "") downloadElem.download = filename;
	else downloadElem.download = this.courses.subject + ".json";
	downloadElem.href = textToSaveAsURL;
	downloadElem.click();
} // End CourseList.prototype.save

// Läs in kurserna från en JSON-fil
CourseList.prototype.load = function() {
	let fileToLoad;		// Fil som användaren pekat ut
	let fileReader;		// FileReader-objekt för inläsning av filen
	fileToLoad = document.getElementById("fileToLoad").files[0];
	fileReader = new FileReader();
	let self = this; // Referens till CourseList-objektet
	fileReader.onload = function(e) { // Anropas då filen är inläst
		self.courses = JSON.parse(e.target.result);
		self.write();
	};
	fileReader.readAsText(fileToLoad,"UTF-8");
} // End CourseList.prototype.load
