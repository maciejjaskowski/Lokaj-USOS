
var countDownDecorator = function(aTag, date){
	aTag.text(time.timeleftTo(date).toString());

	var wait = 1000;
	setInterval(
			function(){
				var tlt = time.timeleftTo(date);
				if(tlt.days < 1){
					aTag.css("background-color", "rgb(100,150,240)");
				}
				aTag.text(tlt.toString());
			}, wait);
	return aTag;
};

var countDownViewBuilder = function(registrationTime){
	var tag = $("<td class='countDownTo'></td>");
	if(registrationTime && new Date(registrationTime).getTime() > (new Date()).getTime()){
		var date = new Date(registrationTime);
		tag = countDownDecorator(tag, date);
	}
	return tag;
};