



var getInformationFromCourseGroupPage = function(course_id){
	var getRegistrationDateLine = function(){
		return $("#cart_info img").parent().next().children().first().html();
	};
	
	var courseTitle = $("h1").html();
//	var name = $("td.form_title:contains('Nazwa przedmiotu')").next().html();
	var prowadzacy = $("td.form_title:contains('Prowadzący')").next().html();
	var termin = $("td.form_title:contains('Termin')").next().html();
	var registrationDateString = undefined;
	try{
		var registrationDateLine = getRegistrationDateLine();
		registrationDateString = registrationDateExtractor(registrationDateLine);
	}catch(e){
	}
	
	var information = dataFromCoursePageURLExtractor.extract(document.URL);
	information.title = courseTitle;
	information.urlDoRejestracji = "http://rejestracja.usos.uw.edu.pl/cart.php?op=reg&" + course_id;
	information.urlDoPrzedmiotu = document.URL;
	information.prowadzacy = prowadzacy;
	information.termin = termin;
	information.czasRejestracji = registrationDateString;
	
	console.warn(information);
	return information;
};