// Globala variabler
var course;		// Objekt för kursinfo

// Initiering av globala variabler och händelsehanterare.
function init() {
	// Variabel tilldelas ett JSON-objekt
	course = {
		"code": "1ME323",
		"title": {
			"swedish": "Webbteknik 3",
			"english": "Web Technology 3"
		},
		"credits": 7.5,
		"time-period": "läsperiod 3",
		"contact person": "Rune Körnefors"
	};
	
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser (endast en kurs i detta fall)
function writeCourseList() {
	let HTMLcode = "<div><strong>" + course.code + " " + course.title.swedish + "</strong>, " +
				course.credits + "hp" + "<br>" +  course.title.english + "<br>" +
				course["time-period"] + ", " + course["contact person"] + "</div>";
	document.getElementById("result").innerHTML = HTMLcode;
} // End writeCourseList
