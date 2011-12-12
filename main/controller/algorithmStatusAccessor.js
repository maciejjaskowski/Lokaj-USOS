var algorithmStatusAccessor = function(view){
  var that = {};
  that.get = function(){
    return view.text();
  };
  that.set = function(text){
    view.text(text);
  };
  that.clear = function(){
    view.children().detach();
  };
  that.setAlgorithmRegistered = function(d){that.clear();  that.set("Najbliższa próba: " + time.toPlText(new Date(d)));};
  that.setAlgorithmStarted  = function(){ that.clear(); that.set("Kolejne próby co 0.5s");};
  that.setAlgorithmSucceeded = function(regOut){ that.set(""); that.clear(); view.append(regOut);};
  that.setAlgorithmStopped = function(){
    that.clear(); that.set("Algorytm rejestracji zatrzymany.");
  };
  return that;
};