
var getRowOfRegistrationInformation = function(doc){
	return $.unique($("tr td a", doc).filter(function(i){
		return courseIdFromURLExtractor.extract(this.href);
	}).parent().parent());
};

var getRegistrationInfoFromRow = function(row){
	var firstTD = $(row).children().first();
	var a = firstTD.children().first();

	var prowadzacy = firstTD.next().children().first().html();
	var termin = firstTD.next().next().next().children().first().html();
	var popup = $("span img", firstTD).attr("onmouseover");
	var registrationDateString = registrationDateExtractor.extract(popup);

	var course_id = courseIdFromURLExtractor.extract(a[0].href);
	console.warn(course_id);
	var courseTitle = $("h1").html();
	
	var information = dataFromCoursePageURLExtractor.extract(a[0].href);
	information.title = courseTitle;
	information.urlDoRejestracji = "http://rejestracja.usos.uw.edu.pl/cart.php?op=reg&" + course_id;
	information.urlDoPrzedmiotu = document.URL;
	information.prowadzacy = prowadzacy;
	information.termin = termin;
	information.czasRejestracji = registrationDateString;
	
	console.warn(information);
	return information;
};

var getPlaceForStarInRow = function(row){
	return $(row).children().first();
};