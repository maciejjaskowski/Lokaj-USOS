
// Custom events

function EventTarget(){
      this._listeners = {};
}

EventTarget.prototype = {

constructor: EventTarget,

             addListener: function(type, listener){
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

        if (this._listeners[event.type] instanceof Array){
          var listeners = this._listeners[event.type];
          for (var i=0, len=listeners.length; i < len; i++){
            listeners[i].call(this, event);
          }
        }
      },

removeListener: function(type, listener){
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

//var libTarget = new EventTarget();

var request = (function(){
    var that = {};
    var log = [];
    log.mpush = function(obj){
      if(devel){
        if(log.length > 100){
          log.splice(0);
        }
        return log.push(obj);
      }
    };
    that.send = function(obj, fun){
      log.mpush("send: ");
      log.mpush(JSON.parse(JSON.stringify(obj)));
      chrome.extension.sendRequest(obj, fun);
    };
    that.tabs = {};
    that.tabs.send = function(tabId, obj, fun){
      log.mpush("sendtab: ");
      log.mpush(JSON.parse(JSON.stringify(obj)));
      chrome.tabs.sendRequest(tabId, obj, fun);
    };

    that.onRequest = {};
    that.onRequest.addListener = function(fun){
      chrome.extension.onRequest.addListener(
        function(msg, sender, sendResponse){
          log.mpush("listen: ");
          log.mpush({msg:JSON.parse(JSON.stringify(msg)),
                    sender:JSON.parse(JSON.stringify(sender))});
          fun(msg, sender, sendResponse);
        });
    };
    that.showLog = function(){
      console.log(log);
    };
    that.clearLog = function(){
      log.splice(0);
    };
    return that;
  });
