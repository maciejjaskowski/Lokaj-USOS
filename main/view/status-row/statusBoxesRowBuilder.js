var statusBoxesRowBuilder = function(rejID){
	var statusy = $("<tr><td colspan=99><table class='statusy'></table></td></tr>");
	request.onRequest.addListener(function(msg){
		if(msg.rejID !== undefined && msg.rejID.id === rejID.id){
			if(msg.type === "registrationTrialStart"){

				var statusBox = statusBoxViewBuilder(msg.statusId);
				$("table",statusy).prepend(statusBox);

				var statusS = $("#" + msg.statusId, statusBox);
				statusBoxController(statusS).setWaiting();
			}
		}
	});
	return statusy;
};