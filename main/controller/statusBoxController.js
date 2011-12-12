var color = {started: "rgb(240, 240, 0)",
		fail: "rgb(230,100,100)",
		success: "rgb(70,200,70)"};

var statusBoxController = function(span, _times){
	var that = {};
	var td = span.parent();
	var times = _times? _times : {fadeOut: 500,
		toFadeOut: 2000,
		toRemove: 10000};
		that.get = function(){
			return span.text();
		};
		that.set = function(text){
			span.text(text);
		};
		that.setWaiting = function(){ that.set(time.currentInPlText()); td.css("background-color", color.started);};
		var setSuccess  = function(){ that.set(time.currentInPlText()); td.css("background-color", color.success);};
		var setFail    = function(){ 
			that.set(time.currentInPlText()); 
			td.css("background-color", color.fail);
			setTimeout(function(){ span.fadeOut(times.fadeOut); }, times.toFadeOut);
			setTimeout(function(){ 
				td.remove(); 
			}, times.toRemove);
		};
		that.setSuccOrFail = function(v){ 
			if (v) {
				setSuccess();
			}
			else {
				setFail();
			} 
		};
		return that;
};