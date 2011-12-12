function MockEventTarget(){
      this._listeners = {};
}
var type="wszystko";

MockEventTarget.prototype = {

constructor: MockEventTarget,
             addListener: function(listener){
               if (typeof this._listeners[type] == "undefined"){
                 this._listeners[type] = [];
               }

               this._listeners[type].push(listener);
             },

fire: function(event){
        if (typeof event == "string"){
          event = { type: event };
        }
        if (!event.target){
          event.target = this;
        }

        if (!event.type){  //falsy
          throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[type] instanceof Array){
          var listeners = this._listeners[type];
          for (var i=0, len=listeners.length; i < len; i++){
            listeners[i].call(this, event);
          }
        }
      },

removeListener: function(listener){
                  if (this._listeners[type] instanceof Array){
                    var listeners = this._listeners[type];
                    for (var i=0, len=listeners.length; i < len; i++){
                      if (listeners[i] === listener){
                        listeners.splice(i, 1);
                        break;
                      }
                    }
                  }
                }
};



//var libTarget = new MockEventTarget();


var mockRequest = (function(){
    var that = {};
    var log = [];
    var target = new MockEventTarget();
    log.mpush = function(obj){
      if(devel){
        if(log.length > 100){
          log.splice(0);
        }
        return log.push(obj);
      }
    };
    that.send = function(obj, fun){
      target.fire(obj);
    };
    that.tabs = {};
    that.tabs.send = function(tabId, obj, fun){
    };

    that.onRequest = {};
    that.onRequest.addListener = function(fun){
      target.addListener(function(msg){fun(msg, "sender", function(){});});
    };
    that.showLog = function(){
    };
    that.clearLog = function(){
    };
    return that;
    });

var newCheckButton = function(target){
  var update = function(){};
  var set = function(){};
  var check = function(){};
  var img = $("<img>");
  img.click(function(){check(img);});
  img.change(function(){update(img);});
  img.set = function(bool){set(img,bool);};
  return img;
};

var shortcutManager = function(){
  var that = {};
  that.register = function(key, fun, name){};
  that.legend = function(){return "";};
  return that;
};


var USOS = function(){
  var that = {};
  that.wezLogin = function(text){
   return "login";
  };

 that.logujDo = function(username, password, target){
  };

 that.wylogujZ = function(target){
  };

  return that;
};


var mockTime = (function(){
  var that = {

   secondsToInterval: function(s,sign){
     
     return {s: 59,
            mins: 59,
            hs: 23,
            days: 1,
            sign:1};
    },

    timeleftTo: function(date){
      return -1000;
    }
  };
  that.toPlHtml = function(date){
   return "PLHTML"; 
  };

  that.toPlText = function(date){
    return "PLTEXT";
  };

  that.currentInPlText = function(date){
    return "CURRENTINPLTEXT";
  };

  return that;
});

var rejestracjaGetID = function(rej){
  return {urlDomena:"a", urlDoRejestracji:"b", id:"ab"};
};

var rejestracja = function(request, libTarget){
  var that = {};
  that.forEach = function(fun){
  };
  that.get = function(rejID){
    return {};
  };
  that.zmien = function(msg){
  };
  that.dodaj = function(rej){
  };
  that.size = function(){
    return 1;
  };
  that.restartAlgorithms = function(){
  };
  return that;
};

var mockTimeout = function(){ 
    return timeOutGen(function(fun,_){ fun(); }, 
                      function(a){}, 
                      true); 
  };
var mockInterval = function(){ 
    return timeOutGen(function(fun,_){ fun(); fun(); }, 
                      function(a){ }, 
                       false); 
  };
