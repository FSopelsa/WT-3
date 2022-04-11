// Globala variabler
var courses;		// Objekt för kursinfo

// Initiering av globala variabler och händelsehanterare.
function init() {
	courses = {
		"subject": "Medieteknik",
		"list": [
			{
				"code": "1ME323",
				"title": {
					"swedish": "Webbteknik 3",
					"english": "Web Technology 3"
				},
				"credits": 7.5
			},
			{
				"code": "1ME311",
				"title": {
					"swedish": "Digitala medier",
					"english": "Digital Media"
				},
				"credits": 7.5
			},
			{
				"code": "1ME331",
				"title": {
					"swedish": "Interaktionsdesign 1",
					"english": "Interaction Design 1"
				},
				"credits": 7.5
			}
		]
	};
	
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser (endast en kurs i detta fall)
function writeCourseList() {
	let HTMLcode = "<h3>" + courses.subject + "</h3>"; // Sträng med HTML-kod som skapas
	for (let i = 0; i < courses.list.length; i++) {
		HTMLcode += "<div><strong>" + courses.list[i].code + " " + courses.list[i].title.swedish +
				"</strong>, " + courses.list[i].credits + "hp" +
				"<br>" +  courses.list[i].title.english + "</div>";
	}
	document.getElementById("result").innerHTML = HTMLcode;
} // End writeCourseList
