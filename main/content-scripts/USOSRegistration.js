var chrome, console;
//var document;
var $;
var EventTarget;


var newCheckButtonTarget = function(target, rej){
	var img = newCheckButton(target);
	img.attr("url", rej.urlDoRejestracji);
	img.attr("id", rej.id);
	img.attr("name", rej.name);

	img.click(function(){		
		if((img.attr("checked") === "true")){
			chrome.extension.sendRequest(
					{type: "addRegistration", 
						rej: rej
					}, function(){});
		}else{
			console.log("remove");
			chrome.extension.sendRequest(
					{type: "removeRegistration", 
						rejID: rej
					}, function(){});
		}
	});
	chrome.extension.sendRequest(
			{type: "registrationExists", 
				rejID: rej}, 
				function(val){
					img.set(val);
					img.change();
				});
	target.addListener("registrationChanged", 
			function(e){
		console.log(e);
		console.log(img.attr("id"));
		if(e.rejId == img.attr("id")){
			console.log("img");
			console.log(img);
			img.set(e.val);
			img.change();
		}
	});
	return img;
};

var decorateCoursesPage = function(target){
	$.each(getRowOfRegistrationInformation(document), function(_,row){
		var courseGroupInformation = getRegistrationInfoFromRow(row);
		var img = newCheckButtonTarget(target, courseGroupInformation);
		getPlaceForStarInRow(row).prepend(img);
	});
};

var decorateCourseGroupPage = function(target, course_id){
	var courseGroupInformation = getInformationFromCourseGroupPage(course_id);
	var checkBtn = newCheckButtonTarget(target, courseGroupInformation);
	var img = $("#cart_info .cart_img a>img");
	if(img.length > 0){
		console.log(img);
		img.parent().parent().prepend(checkBtn);
	}else{
		console.log($("#cart_info>.cart_img>img"));
		$("#cart_info img").first().before(checkBtn);
	}
};

var decorateCoursePageOrCourseGroupPage = function(target){
	var courseRegexp = new RegExp("(|http://)rejestracja.usos.uw.edu.pl/course.php");
	var course_id = courseIdFromURLExtractor.extract(document.URL);
	console.warn("course_id: " + course_id);
	if(course_id){
		decorateCourseGroupPage(target, course_id);
	}
	else if(courseRegexp.exec(document.URL)){
		decorateCoursesPage(target);
	}
};

decorateCoursePageOrCourseGroupPage(new EventTarget());


