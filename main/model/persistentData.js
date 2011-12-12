var localStorage;
var JSON, console;
var persistentData = function(name){
  var that = {};
  that.load = function(){
    if (localStorage[name]) {
      that.storage = JSON.parse(localStorage[name]);
    }else{
      that.storage = {};
    }
    
    return that;
  };

  that.save = function(){
    localStorage[name] = JSON.stringify(that.storage);
  };

  that.get = function(){
    console.error("This function (get) should be overwritten!");
  };
  that.remove = function(){
    console.error("This function (remove) should be overwritten!");
  };
  that.add = function(){
    console.error("This function (add) should be overwritten!");
  };

  return that.load();
};

