// Globala variabler
var courses = [];	// Array med objekt för kursinfo

// Initiering av globala variabler och händelsehanterare
function init() {
	courses.push( {code:"1ME323",title:{swedish:"Webbteknik 3",english:"Web Technology 3"},credits:7.5} );
	courses.push( {code:"1ME311",title:{swedish:"Digitala medier",english:"Digital Media"},credits:7.5} );
	courses.push( {code:"1ME331",title:{swedish:"Interaktionsdesign 1",english:"Interaction Design 1"},credits:7.5} );
	
	document.getElementById("addBtn").addEventListener("click",addCourse);
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser
function writeCourseList() {
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < courses.length; i++) {
		// Kursens index sparas i elementet med "x" – behövs om kursen ska tas bort
		HTMLcode += "<span data-ix='" + i + "'>x</span>" +
			"<div><strong>" + courses[i].code + " " + courses[i].title.swedish + "</strong>, " +
			courses[i].credits + "hp" + "<br>" +  courses[i].title.english + "</div>";
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
	let obj = { // Nytt objekt med data från formuläret
		code: formElem.courseCode.value,
		title: {
			swedish: formElem.swedishTitle.value,
			english: formElem.englishTitle.value
		},
		credits: formElem.credits.value
	};
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
