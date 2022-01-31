// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectMenuElem = document.getElementById("subjectMenu");
	courseMenuElem = document.getElementById("courseMenu");
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	subjectMenuElem.addEventListener("change",selectSubject);
	courseMenuElem.addEventListener("change",selectCourses);
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad

// ------------------------------ Meny 1 ------------------------------
// Avläs menyn för val av ämne
function selectSubject() {
	let subjectId = this.value;  //Ämne i valt alternativ
	requestData(subjectId);
	this.selectedIndex = 0;
} // End selectSubject

// Gör ett Ajax-anrop för att läsa in begärd info
function requestData(subjectId) {
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","getSubInfo.php?file=https://medieteknik.lnu.se/1me323/subjects.xml&id=" + subjectId,true);
	
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getData(request.responseXML); // status 200 (OK) --> filen fanns
											// request.responseXML då vi läser in XML-kod
			else resElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestData

// Tolkar XML och skriver ut viss data
function getData(XMLcode) {
	let subjectElem = XMLcode.getElementsByTagName("subject"); // array med alla subject-element
	let HTMLcode = "";  //Textsträng där ny HTML skrivs

	for (let i = 0; i < subjectElem.length; i++) { // Referens till name- och info-element inom subjectElementen
		let nameElem = subjectElem[i].getElementsByTagName("name")[0];
		let infoElem = subjectElem[i].getElementsByTagName("info")[0];
		HTMLcode += "<h3>" + nameElem.firstChild.data + "</h3>"; //Bygger HTML
		HTMLcode += "<p>" + infoElem.firstChild.data + "</p>"; //Bygger HTML
	}
	subjectInfoElem.innerHTML = HTMLcode; // Skriver HTML
} // End getData


// -------------------------------- Meny 2 --------------------------------
// Avläs menyn för val av ämne för kurser
function selectCourses() {
	let course = this.value; //Kurs i valt alternativ
	requestCourseData(course);
	this.selectedIndex = 0;
} // End selectCourses

// Gör ett Ajax-anrop för att läsa in begärd info
function requestCourseData(course) {
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","xml/courselist" + course + ".xml",true);
	
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getCourseData(request.responseXML); // status 200 (OK) --> filen fanns
											// request.responseXML då vi läser in XML-kod
			else resElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestCourseData

// Tolkar XML och skriver ut viss data
function getCourseData(XMLcode) {	
	let selSubjectElem = XMLcode.getElementsByTagName("subject")[0];
	let HTMLcode = "<h3>" + selSubjectElem.firstChild.data + "</h3>";  //Skapar textsträng för ny HTML, och skriver rubrik
	
	let CourseElem = XMLcode.getElementsByTagName("course"); // Array med alla course-element
	for (let i = 0; i < CourseElem.length; i++) { // Referenser till de element som ska användas
		let courseCodeElem = CourseElem[i].getElementsByTagName("code")[0];
		let courseTitleElem = CourseElem[i].getElementsByTagName("title")[0];
		let courseCreditsElem = CourseElem[i].getElementsByTagName("credits")[0];

		HTMLcode += "<p>" + courseCodeElem.firstChild.data + ", " + courseTitleElem.firstChild.data + ", " + courseCreditsElem.firstChild.data + "hp" + "</p>"; //Bygger HTML
	}
	courseListElem.innerHTML = HTMLcode; // Skriver HTML
} // End getCourseData
