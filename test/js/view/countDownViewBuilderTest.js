

//module2: builder (porównać stringi)

module("countDownViewBuilder");

test("should accept a number of miliseconds as argument", function(){
	var tag = countDownViewBuilder(new Date().getTime() + 200);
	console.log(tag);
	strictEqual(tag.text(),"1");
});

test("should accept a date object as argument", function(){
	var tag = countDownViewBuilder(new Date().getTime() + 200);
	console.log(tag);
	strictEqual(tag.text(),"1");
});

test("should not decorate when the time is due", function(){
	var tag = countDownViewBuilder(new Date() - 2);
	strictEqual($(tag).text(),"");
});

test("should decorate when the time is ahead", function(){
	var d= new Date();
	d.setTime(new Date().getTime() + 360 * 1000);
	var tag = countDownViewBuilder(d);
	console.log(tag);
	strictEqual(tag.text(),"1");
});

var time = (function(){
	var that = {};
	that.timeleftTo = function(date){
		return 1;
	};
	return that;
})();

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



