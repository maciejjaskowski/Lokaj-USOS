alert("D");
(function(window){
var libTarget = new EventTarget();
var request = request();
var rejestracja = rejestracjaReadOnly();
var shortcutManager = shortcutManager();
// Restores select box state to saved value from localStorage.

alert("C");
window.shortcuts = function(e){
  if (e.target.nodeName === "INPUT") {
    return true;
  }
  return shortcutManager.click(e);
};
alert("B");

window.setupLogging = function(libTarget){
	  libTarget.addListener("login", 
	    function(msg){
	      var accessor = loginStateAccessor();
	      console.log(msg);
	      if(msg.stat === "waiting"){
	         accessor.tryLogin();
	      }
	      else if(!msg.fail){
	         accessor.loggedInAs(msg.login);
	       } else {
	         accessor.notLoggedInBecauseOf(msg.reason);
	       }
	     });

	  libTarget.addListener("login",
	      function(msg){
	        if(!msg.fail){
	          $.get("http://rejestracja.usos.uw.edu.pl/cart.php", {},
	            function(data, status, xhr){
	        	  USOSShoppingCartAccessor().parseHtml(xhr.responseText);
	            });
	        }
	      });

	  libTarget.addListener("logout",
	    function(msg){
	      if(msg.stat === "waiting"){
	        loginStateAccessor().tryLogout();
	        
	      }else{
	        loginStateAccessor().notLoggedInBecauseOf();
	      }
	    });


	  libTarget.addListener("logout",
	      function(msg){
		  	shoppingCartAccessor().detachGrid();
	      });

	  shoppingCartAccessor().hidePane();
	  loginDataAccessor()
	    .setUsername(localStorage.username)
	    .setPassword(localStorage.password);
	  logujMnieDoUSOS(USOS);
	};

	var USOS = USOS(libTarget);
	var logujMnieDoUSOS = function(){
	  localStorage.username = loginDataAccessor().getUsername();
	  localStorage.password = loginDataAccessor().getPassword();
	  USOS.logujDo(localStorage.username, localStorage.password);
	};

	var wylogujMnieZUSOS = function(){
	  USOS.wylogujZ();
	};

alert("A");
window.start = function() {
	loginButtonAccessor().click(logujMnieDoUSOS);
	logoutButtonAccessor().click(wylogujMnieZUSOS);
	
	onRegistrationTrialRefreshShoppingCart(request);
	setupLogging(libTarget);

/*  $("#rejestruj").attr("onclick",
      function(){ return rejestruj; });*/

	setupRegistrations(libTarget, rejestracja);

	registerShortcutsForRegistration(shortcutManager);
	$("#shortcutsLegend").append(shortcutManager.legend());

	setupTabs([$("#registrations"), $("#refresher")]);
	hideTabs();
	setupFacebook();
};
})(window);