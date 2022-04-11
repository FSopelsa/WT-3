// Globala variabler
var courses = [];	// Array med objekt för kursinfo

// Initiering av globala variabler och händelsehanterare
function init() {
	courses[0] = {
		code: "1ME323",
		title: {
			swedish: "Webbteknik 3",
			english: "Web Technology 3"
		},
		credits: 7.5
	};
	
	courses[1] = {
		code: "1ME311",
		title: {
			swedish: "Digitala medier",
			english: "Digital Media"
		},
		credits: 7.5
	};
	
	courses[2] = {
		code: "1ME331",
		title: {
			swedish: "Interaktionsdesign 1",
			english: "Interaction Design 1"
		},
		credits: 7.5
	};
	
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser
function writeCourseList() {
	let HTMLcode = ""; // Sträng med HTML-kod som skapas
	for (let i = 0; i < courses.length; i++) {
		HTMLcode += "<div><strong>" + courses[i].code + " " + courses[i].title.swedish + "</strong>, " +
					courses[i].credits + "hp" + "<br>" +  courses[i].title.english + "</div>";
	}
	document.getElementById("result").innerHTML = HTMLcode;
} // End writeCourseList
