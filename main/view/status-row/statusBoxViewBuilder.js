var statusBoxViewBuilder = function(id){
	var stat =  $("<td>&nbsp;</td>");
	var span = $("<span class='status' id='"+id+"'></span>");
	stat.append(span);
	var obj = statusBoxController(span);

	request.onRequest.addListener(
			function(msg, sender, sendResponse){
				console.log(msg);
				if(msg.statusId === id){
					if(msg.type === "registrationTrial"){
						obj.setSuccOrFail(msg.val);
						sendResponse({});
					}
				}
			});
	stat.span = span;
	return stat;
};