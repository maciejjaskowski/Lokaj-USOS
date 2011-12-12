var setupTabs = function(tabs){
	
	var accessor = tabsAccessor();

	var switchTo = function(tab){
		var i;
		for(i = 0; i < tabs.length; i++){
			if(tabs[i] != tab){
				tabs[i].css("display", "none");
			}else{
				tabs[i].css("display", "inline");
			}
		}
	};
	
	accessor.change(function(){
		if(!accessor.isChecked()){
			switchTo(tabs[0]);
		}else{
			switchTo(tabs[1]);
		}
	});
	
	tabs[1].css("display","none");
};

var hideTabs = function(){
	var accessor = tabsAccessor();
	accessor.hide();
};