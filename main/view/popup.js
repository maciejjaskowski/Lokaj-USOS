
var loginStateAccessor = function(){
  var that = {};
  var loginStateView = $("#stan_logowania");
  that.tryLogin = function(){
    loginStateView.text("Próbuję zalogować");
  };
  that.loggedInAs = function(userName){
    loginStateView.text("Zalogowany jako: " + userName);
  };
  that.notLoggedInBecauseOf = function(reason){
    if(reason){
      loginStateView.text("Nie zalogowany " + "("+reason + ")");
    }else{
      loginStateView.text("Nie zalogowany");
    }
  };
  that.tryLogout = function(){
    loginStateView.text("Próbuję wylogować");
  };
  return that;
};

var loginDataAccessor = function(){
  var that = {};
  var usernameField = $("#PESEL");
  var passwordField = $("#haslo");
  that.getUsername = function(){
    return usernameField.attr('value');
  };
  that.setUsername = function(newUsername){
	    usernameField.attr("value", newUsername);
	    return that;
	  };
	  
  that.getPassword = function(){
    return passwordField.attr('value');
  };
  that.setPassword = function(newPassword){
	    passwordField.attr("value", newPassword);
	    return that;
	  };
  return that;
};

var loginButtonAccessor = function(){
	var that = {};
	var loginButton = $("#zaloguj");
	that.click = function(fun){
		loginButton.click(fun);
	};
	return that;
};

var logoutButtonAccessor = function(){
	var that = {};
	var logoutButton = $("#wyloguj");
	that.click = function(fun){
		logoutButton.click(fun);
	};
	return that;
};