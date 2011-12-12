
var registrationsAccessor = function(){
	var that = {};
	var registrationsGrid = $("#rejestracjeTabela");
	
	that.remove = function(fun){
		$("#usun").click(fun);
		return that;
	};
	
	that.selectAll = function(fun){
		$("#zaznacz_wszystkie").click(fun);
	};

	that.addRow = function(row){
		registrationsGrid.append(row);
		return registrationsGrid;
	};

	return that;
};


var registerShortcutsForRegistration = function(shortcutManager){
  // if(e.keyIdentifier === "U+0053") //s
/*  shortcutManager.register("U+0057", wylogujMnieZUSOS, "wyloguj");
  shortcutManager.register("U+005A", logujMnieDoUSOS, "zaloguj");
  shortcutManager.register("U+0052", function(){$("#rejestruj").click(); return true;}, "rejestruj");
  shortcutManager.register("U+0041", function(){$("#zaznacz_wszystkie").click(); return true;}, "zaznacz wszystkie");*/
};



var shoppingCartAccessor = function(){
	var that = {};
	var getShoppingCartGrid = function(){
		return $("#koszyk_tabela");
	};
	var shoppingCartPane = $("#koszyk");
	that.detachGrid = function(){
		var shoppingCartGrid = getShoppingCartGrid();
		if(shoppingCartGrid){
			shoppingCartGrid.detach();
		}
	};
	
	that.hidePane = function(){
		return shoppingCartPane.hide();
	};
	
	that.fadeIn = function(){
		shoppingCartPane.fadeIn(1000);
	};
	
	that.setShoppingCartGrid = function(grid){
		grid.appendTo(shoppingCartPane);
		that.fadeIn();
	};

	return that;
};

var USOSShoppingCartAccessor = function(){
	var that = {};
	var dehref =  function(index, attr){
		  $(this).click(function(){
		      chrome.tabs.create({url:"http://rejestracja.usos.uw.edu.pl/" + attr});
		      });
		  return "javascript:void(0)";
		};
	that.parseHtml = function(html){
		var table = $("table.wrnav", html).first().next();
		var koszyk_tabela = table.attr("id", "koszyk_tabela");
		parseShoppingCartGrid(koszyk_tabela);
	};
	
	var amendURLsOfImgs = function(grid){
		$("img", grid).attr("src", 
			      function(index, attr){
			      return "http://rejestracja.usos.uw.edu.pl/" + attr;
			      });
	};
	
	var amendURLsOfAnchors = function(grid){
		$("a", grid).attr("href", dehref).attr("class", "");
	};
	
	var parseShoppingCartGrid = function(grid){
		
		var getStatusOfAlgorithmViewFromURL = function(url){
			var regExp = new RegExp(".*course_id=([0-9]+).*gr_no=([0-9]+)");
			var match = regExp.exec(url);
			  if(match){
				  var course_id = match[1];
				  var gr_no = match[2];
				  var id = "rejestracja_"+course_id+"_"+gr_no;
				  var row = $("#" + id);
				  var stat = $(".stat", row);
				  return stat;
			  }
		};
		  var accessor = shoppingCartAccessor();
		  accessor.detachGrid();
		  
		  accessor.setShoppingCartGrid(grid);
		  
		  amendURLsOfImgs(grid);
		  
		  $(">tbody>tr", grid).each(function(index, tr){
			  var a = $("a", $(tr)).first();
			  var status = getStatusOfAlgorithmViewFromURL(a.attr("href"));
			  if(status){
				  algorithmStatusAccessor(status)
				  .setAlgorithmSucceeded($("img", koszyk_tabela).parent());
				  amendURLsOfAnchors(status);
			  }
		  });
		  amendURLsOfAnchors(grid);
		  
	};
	return that;
};

var onRegistrationTrialRefreshShoppingCart = function(request){
  request.onRequest.addListener(function(msg){
      if(msg.type === "registrationTrial"){
    	  USOSShoppingCartAccessor().parseHtml(msg.responseText);
      }
  }); 
};


