var dateViewBuilder = function(registrationTime){
	if(registrationTime && new Date(registrationTime).getTime() > (new Date()).getTime()){
		var date = new Date(registrationTime);
		dateTD = $("<td class='dateInPl'>" + time.toPlHtml(date) + "</td>");
	}else{
		dateTD = $("<td class='dateInPl'> Już rozpoczęta! </td>");
	}
	return dateTD;
};