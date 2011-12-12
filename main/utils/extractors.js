var courseIdFromURLExtractor = (function(){
	var that = {};
	var course_idRegexp = new RegExp("(|http://)rejestracja.usos.uw.edu.pl/course.php\?.*(course_id=[0-9]*&gr_no=[0-9]*)");
	that.extract = function(theLine){
		try{
		var match = course_idRegexp.exec(theLine);
		}catch(e){
			return undefined;
		}
		if(!match){
			return undefined;
		}
		return match[2];
	};
	return that;
})();

var registrationDateExtractor = (function(){
	var that = {};
	var registrationDateRegExp = (new RegExp('Rejestracja .* otwarta od ([-:0-9 ]*)'));
	that.extract = function(registrationDateLine){
		try{
		return registrationDateLine?
				registrationDateRegExp.exec(czasLine)[1] 
				: undefined;
		}catch(e){
			return undefined;
		}
	};
	return that;
})();

var dataFromCoursePageURLExtractor = (function(){
	var that = {};
	that.extract = function(url){
		var data = {};
		var registrationURLRegExp = new RegExp("(|https?://)([.a-zA-Z]*/).*course_id=([0-9]+).*gr_no=([0-9]+)");

		var match = registrationURLRegExp.exec(url);
		data.urlDomena = match[1] + match[2];
		data.course_id = match[3];
		data.gr_no = match[4];
		data.id = "rejestracja_" + data.course_id + "_" + data.gr_no;
		return data;
	};
	return that;
})();