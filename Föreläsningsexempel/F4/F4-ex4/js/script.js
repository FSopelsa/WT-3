// Globala variabler
var courses;	// Array med objekt för kursinfo

// Initiering av globala variabler och händelsehanterare
function init() {
	courses = new CourseList("Medieteknik"); // Skapa en ny kurslista
	courses.list.push(new Course("1ME323","Webbteknik 3","Web Technology 3",7.5));
	courses.list.push(new Course("1ME311","Digitala medier","Digital Media",7.5));
	courses.list.push(new Course("1ME331","Interaktionsdesign 1","Interaction Design 1",7.5));
	//document.getElementById("addBtn").addEventListener("click",courses.add);
	// Med ovanstående kod kommer this referera till knappen i funktionen add
	// Med nedanstående kod kommer this referera till objektet courses i funktionen add
	document.getElementById("addBtn").addEventListener("click",function() { courses.add(); });
	document.getElementById("writeBtn").addEventListener("click",function() { courses.write(); });
} // End init
window.addEventListener("load",init);

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
	return "<div><strong>" + this.code + " " + this.title.swedish + "</strong>, " +
			this.credits + "hp" + "<br>" +  this.title.english + "</div>";
} // End Course.prototype.write

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
		//delBtnElems[i].addEventListener("click",function(e) { this.delete(e); });
		// I ovanstående kod är this en referens till det HTML-element användaren klickat på
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
		//let ix = this.getAttribute("data-ix");  // this är nu en referens till objektet CourseList
		let ix = e.currentTarget.getAttribute("data-ix"); // Index till kurs som ska tas bort
		this.list.splice(ix,1);
		this.write();
	}
} // End CourseList.prototype.delete
