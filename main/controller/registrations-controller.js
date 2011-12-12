var time = time();


var addRows = function(accessor, registrations, libTarget){
	registrations.forEachRegistration(function(reg){
		registrationsGrid = accessor.addRow(registrationRowBuilder(libTarget, reg));
		registrationsGrid = accessor.addRow(statusBoxesRowBuilder(rejestracjaGetID(reg)));
	});
};

var setupRegistrations = function(libTarget, registration){
	var accessor = registrationsAccessor();
	addRows(accessor, registration, libTarget);

	accessor.remove( 
			function(){ 
				libTarget.fire("usun"); 
			});
	accessor.selectAll(
			function(){
				$(".zaznacz").attr("checked", true).change(); 
			});

};

