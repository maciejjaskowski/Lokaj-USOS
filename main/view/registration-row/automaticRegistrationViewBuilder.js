var automaticRegistrationCheckBoxBuilder = function(rejID, initiallyChecked){
	 var auto = $("<input type='checkbox'>")
	    .attr("checked", initiallyChecked);
	  var setAuto = function(){
	    if(auto.attr("checked")){
	      auto.attr("title", "Lokaj spróbuje Cię zarejestrować na ten przedmiot ");
	    }else{
	      auto.attr("title", "Czy Lokaj ma spróbować automatycznie Cię zarejestrować w odpowiednim momencie?");
	    }
	  };
	  setAuto();

	  auto.click(
	    function(){
	      var auto = $(this).attr("checked");
	      request.send(
	        {type: "changeRejestracja",
	          rejID: rejID,
	          auto: auto}, function(){});
	      setAuto();
	    });
	  request.onRequest.addListener(function(msg,sender, sendResponse){
	    if(msg.rejID !== undefined && msg.rejID.id === rejID.id){
	      if(msg.type === "algorithmStopped"){
	        auto.attr("checked", false);
	      request.send(
	        {type: "changeRejestracja",
	          rejID: rejID,
	          auto: false}, function(){});
	      }
	      setAuto();
	      sendResponse({});
	    }
	  });
	  return auto;
};

var automaticRegistrationViewBuilder = function(rejID, initiallyChecked){
	return $("<td class='autoRegistration'></td>")
			.append(automaticRegistrationCheckBoxBuilder(rejID, initiallyChecked));
};