// Globala variabler
var courses = [];	// Array med objekt för kursinfo

// Initiering av globala variabler och händelsehanterare
function init() {
	courses.push(new Course("1ME323","Webbteknik 3","Web Technology 3",7.5));
	courses.push(new Course("1ME311","Digitala medier","Digital Media",7.5));
	courses.push(new Course("1ME331","Interaktionsdesign 1","Interaction Design 1",7.5));
	document.getElementById("addBtn").addEventListener("click",addCourse);
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
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
	/*		// Istället för att lägga metoden här, läggs den in i objektets prototyp nedan
	this.write = function() {
		return "<div><strong>" + this.code + " " + this.title.swedish + "</strong>, " +
			this.credits + "hp" + "<br>" +  this.title.english + "</div>";
	} // End write
	*/
} // End constructor for Course

// Metod för utskrift av en kurs
Course.prototype.write = function() {
	return "<div><strong>" + this.code + " " + this.title.swedish + "</strong>, " +
			this.credits + "hp" + "<br>" +  this.title.english + "</div>";
} // End Course.prototype.write

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser
function writeCourseList() {
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < courses.length; i++) {
		// Kursens index sparas i elementet med "x" – behövs om kursen ska tas bort
		HTMLcode += "<span data-ix='" + i + "'>x</span>" + courses[i].write();
	}
	document.getElementById("result").innerHTML = HTMLcode;
	let delBtnElems = document.querySelectorAll("#result > span"); // "Knapp" (x) för att ta bort kurs
	for (let i = 0; i < delBtnElems.length; i++) {
		delBtnElems[i].addEventListener("click",deleteCourse);
	}
} // End writeCourseList

// Skapa ett nytt objekt med data från formuläret och lägg in det i arrayen courses
function addCourse() {
	let formElem = document.getElementById("inputForm"); // Formulär för input av en ny kurs
	// Nytt objekt med data från formuläret
	let obj = new Course(formElem.courseCode.value,
					formElem.swedishTitle.value,
					formElem.englishTitle.value,
					formElem.credits.value);
	courses.push(obj);
	writeCourseList();
} // End addCourse

// Ta bort en kurs ur arrayen courses
function deleteCourse() {
	if (confirm("Är du säker på att du vill ta bort kursen?")) {
		let ix = this.getAttribute("data-ix"); // Index till kurs som ska tas bort
		courses.splice(ix,1);
		writeCourseList();
	}
} // End deleteCourse
