
var USOS = function(target, onEvents){
	var that = {};
	var onEvents = {
			loginSuccessfull:
				function(login){
				target.fire({
					type:"login",
					fail: false,
					login: login});
			},
			loginFailed:
				function(reason){
				target.fire({
					type:"login",
					fail: true,
					reason: reason});
			},
			loggingOut:
				function(){
				target.fire({type:"logout", stat: "waiting"});
			},
			loggedOut:
				function(){
				target.fire({type:"logout"});
			}
	};


  var loginSuccessfull = function(login){
    if(onEvents.loginSuccessfull){
      onEvents.loginSuccessfull(login);
    }
  };
  var loginFailed = function(){
    if(onEvents.loginFailed){
      onEvents.loginFailed();
    }
  };
  var loggingOut = function(){
    if(onEvents.loggingOut){
      onEvents.loggingOut();
    }
  };
  var loggedOut = function(){
    if(onEvents.loggedOut){
      onEvents.loggedOut();
    }
  };
  that.wezLogin = function(text){
   return $("td:contains('Zalogowany ')", text).find("b").text();
  };


 that.logujDo = function(username, password){
  var ltRegExp = new RegExp(".*hidden.*name=.lt..*value=.([-_a-zA-Z0-9]*)");
  target.fire(
      {type:"login",
       stat: "waiting"
      });
  $.get("https://logowanie.uw.edu.pl/cas/login?service=http://rejestracja.usos.uw.edu.pl/caslogin.php&locale=pl", {},
      function(data, status, xhr){
        var login = that.wezLogin(xhr.responseText);
        if(login){
          
          loginSuccessfull(login);
                    return;
        }
        try{
          var lt = ltRegExp.exec(xhr.responseText)[1];
          console.log("lt: " + lt);
        } catch(e){
          loginFailed("Brak połączenia z https://logowanie.uw.edu.pl");
                    return;
        }

        $.post("https://logowanie.uw.edu.pl/cas/login", {lt: lt, _eventId:"submit", submit:"ZALOGUJ", username:username, password:password},
        function(data, textStatus, xhr){
          var login = that.wezLogin(xhr.responseText);
          if(login){
        	  console.log("login: " + login);
            loginSuccessfull(login);
          }else{
            loginFailed("login lub hasło nieprawidłowe");
          }
         });
   });
  };

 that.wylogujZ = function(){
  loggingOut();
  $.get("http://rejestracja.usos.uw.edu.pl/logout.php",{},
      function(){
        loggedOut();
      });
  };

  return that;
};

