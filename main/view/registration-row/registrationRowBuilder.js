var starButtonBuilder = function(target, rejID){
  var img = newCheckButton(target);
  img.attr("class", "zaznacz");
  img.rejID = rejID;
  target.addListener("usun", function(msg){
      if(img.attr("checked") === "true"){
        var row = img.parent().parent();
        request.send(
          {type: "removeRegistration",
            rejID: rejID,
            val: false}, function(){}); 
        row.next().detach();
        row.detach();
      }
    });
  return img;
};

var changeDate = function(td,rej){
	var d = prompt("Podaj nową datę", rej.czasRejestracji);
	var date;
	if(d){
		date = new Date(d);
		request.send(
				{type: "changeRejestracja",
					rejID: rejestracjaGetID(rej),
					czasRejestracji: date}, 
					function(){});
		console.log("request sent: " + date + new Date());
	}
};

var registrationRowBuilder = function(libTarget, rej){

	var dateTD = dateViewBuilder(rej.czasRejestracji);
	devel = true;
	if (devel) {
		dateTD.click(function(){
			changeDate(dateTD, rej);
		});
	}

	var row = $("<tr id='" + rej.id + "'></tr>");
	row.append(
			($("<td></td>")
					.attr("width", "12px")
					.append(starButtonBuilder(libTarget, rejestracjaGetID(rej)))
			))
			.append(
//					"<td width='220px'>" + domena + "</td>" + 
					"<td width='400px'><a href='javascript:void(0)' onclick='javascript:window.open(\"" + rej.urlDoPrzedmiotu + "\")'>" + rej.name + "</a></td>" + 
					"<td width='100px'>" + rej.termin + "</td>" +
					"<td width='100px'>" + rej.prowadzacy + "</td>" +
			"")
			.append(dateTD)
			.append(countDownViewBuilder(rej.czasRejestracji))
			.append(automaticRegistrationViewBuilder(rejestracjaGetID(rej),
					rej.algorytmData ? "true" : "")) 
			.append(algorithmStatusBuilder(rej.algorytmData, rejestracjaGetID(rej)));
	return row;
};