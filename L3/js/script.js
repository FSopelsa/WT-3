// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click",listLinks);
	
	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click",addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");
	
	document.getElementById("teacherBtn").addEventListener("click",addTeachers); // Används i extramerit
} // End init+
window.addEventListener("load",init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {
	let links = document.querySelectorAll("main section:nth-of-type(1) div:first-of-type a"); // Länk-array
	for (let i = 0; i < links.length; i++) {
		let clonedLink = links[i].cloneNode(true);				// Klon av länkarna
		let newElem = document.createElement("p");				// Nytt element
		newElem.appendChild(clonedLink);
		newElem.setAttribute('target', '_blank');
		linkListElem.appendChild(newElem);						// Klonerna flyttas till nästa div
	}
} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
	let klickedCourse = this.innerHTML;
	let movedCourses = courseListElem.querySelectorAll("p");
	for (let i = 0; i < movedCourses.length; i++) {
		if (klickedCourse == movedCourses[i].innerHTML) {
		return;
		}
	}
	let newElem = document.createElement("p");
	let newTextNode = document.createTextNode(klickedCourse);
	newElem.appendChild(newTextNode);
	newElem.addEventListener("click",removeCourse);
	newElem.style.cursor = "pointer";
	let firstPelemInList = courseListElem.querySelector("p");
	courseListElem.insertBefore(newElem,firstPelemInList);
} // End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	console.log("removeCourse");
	this.parentNode.removeChild(this);
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault","Rune Körnefors","Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault","http://lnu.se/personal/rune.kornefors","https://lnu.se/personal/jorgeluis.zapico/"];
	
} // End addTeachers