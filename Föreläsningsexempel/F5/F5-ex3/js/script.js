// Globala variabler
var courselist;	// Objekt med ämne och kurslista

// Initiering av globala variabler och händelsehanterare
function init() {
	courselist = new CourseList("Medieteknik"); // Skapa en ny kurslista
	courselist.addCourse("1ME323","Webbteknik 3","Web Technology 3",7.5);
	courselist.addCourse("1ME311","Digitala medier","Digital Media",7.5);
	courselist.addCourse("1ME331","Interaktionsdesign 1","Interaction Design 1",7.5);
	document.getElementById("addBtn").addEventListener("click",function() { courselist.add(); });
	document.getElementById("writeBtn").addEventListener("click",function() { courselist.write(); });
	document.getElementById("saveBtn").addEventListener("click",function() { courselist.save(); });
	document.getElementById("loadBtn").addEventListener("click",function() { courselist.load(); });
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

// Spara alla kurser i localStorage
CourseList.prototype.save = function() {
	localStorage.setItem("1me323f5_" + this.courses.subject,JSON.stringify(this.courses));
} // End CourseList.prototype.save

// Läs in kurserna från localStorage
CourseList.prototype.load = function() {
	let courselist = localStorage.getItem("1me323f5_" + this.courses.subject);
	if (courselist) {
		this.courses = JSON.parse(courselist);
		this.write();
	}
	else {
		alert("Det finns inga kurser sparade.");
	}
} // End CourseList.prototype.load
