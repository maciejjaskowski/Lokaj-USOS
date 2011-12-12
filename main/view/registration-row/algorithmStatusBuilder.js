var algorithmStatusBuilder = function(algorithmData, rejID){
	var algorithmStatus = $("<td class='stat'></td>");

	var accessor = algorithmStatusAccessor(algorithmStatus);

	if(algorithmData && algorithmData.stat){
		console.log(algorithmData);
		if(algorithmData.stat === "registered"){
			accessor.setAlgorithmRegistered(algorithmData.firstTrialTime);
		}else if(algorithmData.stat === "started"){
			accessor.setAlgorithmStarted();
		}
	}
	request.onRequest.addListener(function(msg){
		if(msg.rejID !== undefined && msg.rejID.id === rejID.id){
			if(msg.type === "algorithmStarted"){
				accessor.setAlgorithmStarted();
			}else if(msg.type === "algorithmStopped"){
				accessor.setAlgorithmStopped();
			}
		}
	}); 
	request.onRequest.addListener(
			function(msg, sender, sendResponse){
				var id = rejestracja.get(msg.rejID) ? rejestracja.get(msg.rejID).id : undefined;
				if (rejID.id !== id) {
					return;
				}
				console.log(msg);
				if(msg.type === "rejestracja_status"){
					if(msg.stat === "waiting"){
						accessor.setAlgorithmRegistered(msg.firstTrialTime);
						sendResponse({});
					}
				}
			});
	return algorithmStatus;
};