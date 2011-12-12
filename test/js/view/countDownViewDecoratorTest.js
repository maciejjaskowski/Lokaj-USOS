
module("countDownDecorator");

var __i = 0;
var time = (function(){
	var that = {};
	that.timeleftTo = function(){
		return {toString: function(){ return __i;}};
	};
	return that;
})();

test("shouldChangeTheTextEverySecond", function() {
	var tag = mockTag();
	var d = new Date();
	d.setTime(d.getTime() + 100000);
	countDownDecorator(tag, d);
	stop(7000);

	var int = setInterval(function(){
		
		strictEqual(tag.text(), __i);
		if(__i > 2){
			start();
			clearInterval(int);
		}
		__i += 1;
	}, 1200);

});



var plStringOfTimeLeftTo = function(arg){
	return arg;
};

var mockTag = function(){
	var that = {};
	var _text = "";
	that.text = function(arg){
		if(arg == undefined){
			return _text;
		}
		_text = arg;
	};
	that.css = function(){
		
	};
	that.attr = function(){
		
	};
	

	return that;
};



