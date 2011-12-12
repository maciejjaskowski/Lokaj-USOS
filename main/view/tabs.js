var tabsAccessor = function(){
	var that = {};
	var tab = $("#tab");
	that.change = function(fun){
		tab.change(fun);
	};
	
	that.isChecked = function(){
		return tab.attr("checked");
	};
	
	that.hide = function(){
		tab.hide();
	};
	
	return that;
};