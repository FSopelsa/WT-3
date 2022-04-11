// Globala variabler
var subCourses = [];	// Array med kurslistor för olika ämnen
var subIx;				// Index för valt ämne

// Initiering av globala variabler och händelsehanterare
function init() {
	subCourses[0] = new CourseList("Medieteknik");
		subCourses[0].list.push(new Course("1ME323","Webbteknik 3","Web Technology 3",7.5));
		subCourses[0].list.push(new Course("1ME311","Digitala medier","Digital Media",7.5));
		subCourses[0].list.push(new Course("1ME331","Interaktionsdesign 1","Interaction Design 1",7.5));
	subCourses[1] = new CourseList("Musikvetenskap");
		subCourses[1].list.push(new Course("1MU311","Musik i film och TV","Music in Film and Television",7.5));
		subCourses[1].list.push(new Course("1MV338","Musikteori I","Musical Theory I",7.5));
		subCourses[1].list.push(new Course("1MV103","Musikmiljöer i Europa genom tiderna","Historical Music Environments in Europe",15));
	subCourses[2] = new CourseList("Svenska språket");
		subCourses[2].list.push(new Course("1SV108","Akademiskt skrivande","Academic Writing",7.5));
		subCourses[2].list.push(new Course("1SV109","Vikingarnas språk","The language of the Vikings",7.5));
		subCourses[2].list.push(new Course("1SV208","Grammatik för lärare","Grammar for Teachers",7.5));
	document.getElementById("addBtn").addEventListener("click",function() { subCourses[subIx].add(); });
	document.getElementById("writeBtn").addEventListener("click",function() { subCourses[subIx].write(); });
	document.getElementById("saveBtn").addEventListener("click",function() { subCourses[subIx].save(); });
	document.getElementById("loadBtn").addEventListener("click",function() { subCourses[subIx].load(); });
	initSubjectMenu();
} // End init
window.addEventListener("load",init);

// Initiera menyn för val av ämne och kurslista
function initSubjectMenu() {
	let menuElem = document.getElementById("subjectMenu"); // Elementet för menyn
	HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < subCourses.length; i++) {
		HTMLcode += "<option>" + subCourses[i].subject + "</option>";
	}
	menuElem.innerHTML = HTMLcode;
	menuElem.selectedIndex = 0;
	subIx = 0;
	menuElem.addEventListener("change",
		function() {
			subIx = this.selectedIndex;
			subCourses[subIx].write();
		}
	);
} // End initSubjectMenu

// -----------------------------------------------------------------------------------------
// ---------- Objektet Course ----------

// Constructor för objektet Course
function Course(code, swTitle, engTitle, credits) {
	this.code = code;
	this.title = {
		swedish: swTitle,
		english: engTitle
	};
	this.credits = credits;
} // End constructor for Course

// Metod för utskrift av en kurs
Course.prototype.write = function() {
	console.log(this, "-this");
	return "<div><strong>" + this.code + " " + this.title.swedish + "</strong>, " +
			this.credits + "hp" + "<br>" +  this.title.english + "</div>";
} // End Course.prototype.write

// Metod för att konvertera en kurs till en textsträng
// Egenskapernas värden sätts samman till en sträng med semikolon som skiljetecken
Course.prototype.toString = function() {
	return this.code + ";" + this.title.swedish + ";" + this.title.english + ";" + this.credits;
} // End Course.prototype.toString

// -----------------------------------------------------------------------------------------
// ---------- Objektet CourseList ----------

// Constructor för objektet CourseList
function CourseList(subject) {
	this.subject = subject;
	this.list = [];	// Ny tom array för objekt med kursinfo
} // End constructor for CourseList

// Skriv ut alla kurser
CourseList.prototype.write = function() {
	let HTMLcode = "<h3>" + this.subject + "</h3>"; // Sträng med HTML-kod som skapas
	for (let i = 0; i < this.list.length; i++) {
		// Kursens index sparas i elementet med "x" – behövs om kursen ska tas bort
		HTMLcode += "<span data-ix='" + i + "'>x</span>" + this.list[i].write();
	}
	document.getElementById("result").innerHTML = HTMLcode;
	let delBtnElems = document.querySelectorAll("#result > span"); // "Knapp" (x) för att ta bort kurs
	let self = this; // self blir en referens till objektet CourseList och kan sedan utnyttjas i händelsehanteraren nedan
	for (let i = 0; i < delBtnElems.length; i++) {
		delBtnElems[i].addEventListener("click",function(e) { self.delete(e); });
	}
} // End CourseList.prototype.write

// Skapa ett nytt Course-objekt med data från formuläret och lägg in det i arrayen list
CourseList.prototype.add = function() {
	let formElem = document.getElementById("inputForm"); // Formulär för input av en ny kurs
	// Nytt objekt med data från formuläret
	let obj = new Course(formElem.courseCode.value,
					 formElem.swedishTitle.value,
					 formElem.englishTitle.value,
					 formElem.credits.value);
	this.list.push(obj);
	this.write();
} // End CourseList.prototype.add

// Ta bort en kurs ur arrayen list
CourseList.prototype.delete = function(e) {
	if (confirm("Är du säker på att du vill ta bort kursen?")) {
		let ix = e.currentTarget.getAttribute("data-ix"); // Index till kurs som ska tas bort
		this.list.splice(ix,1);
		this.write();
	}
} // End CourseList.prototype.delete

// Spara alla kurser i localStorage
CourseList.prototype.save = function() {
	let listStr = this.subject; // Textsträng med listans innehåll
	for (let i = 0; i < this.list.length; i++) {
		listStr += ";" + this.list[i].toString(); // Anropar toString i Course
	}
	localStorage.setItem("1me323f4_" + this.subject,listStr); // Anropar toString i CourseList
} // End CourseList.prototype.save

// Läs in kurslistan från localStorage och återskapa objekten
CourseList.prototype.load = function() {
	let courseList = localStorage.getItem("1me323f4_" + this.subject);
	if (courseList) {
		let courseData = courseList.split(";"); // Array med inläst kursdata
		this.subject = courseData[0];
		this.list.length = 0; // Töm listan
		for (let i = 1; i < courseData.length; i = i + 4) { // Skapa kurserna
			this.list.push(new Course(courseData[i],courseData[i+1],courseData[i+2],courseData[i+3]));
		}
		this.write();
	}
	else {
		alert("Det finns inga kurser sparade.");
	}
} // End CourseList.prototype.load
