// Globala variabler
var course1, course2, course3;	// Objekt för kursinfo

// Initiering av globala variabler och händelsehanterare
function init() {
	course1 = new Object();
	course1.code = "1ME323";
	course1.title = "Webbteknik 3";
	course1.credits = 7.5;
	
	course2 = {};
	course2.code = "1ME311";
	course2.title = "Digitala medier";
	course2.credits = 7.5;
	
	course3 = {
		code: "1ME331",
		title: "Interaktionsdesign 1",
		credits: 7.5
	};
	
	document.getElementById("writeBtn").addEventListener("click",writeCourseList);
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skriv ut alla kurser
function writeCourseList() {
	let HTMLcode = "<div><strong>" + course1.code + " " + course1.title + "</strong>, " +
					course1.credits + "hp</div>";
	HTMLcode += "<div><strong>" + course2.code + " " + course2.title + "</strong>, " +
					course2.credits + "hp</div>";
	HTMLcode += "<div><strong>" + course3.code + " " + course3.title + "</strong>, " +
					course3.credits + "hp</div>";
	document.getElementById("result").innerHTML = HTMLcode;
} // End writeCourseList
