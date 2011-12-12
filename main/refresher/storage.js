var jQuery, $, JSON, localStorage;
var console, webkitNotifications;

var EventTarget;
var persistentData;
var timeout, interval;
var timeoutIntervalAlgorithm;

var devel = false;

var urlStorageReadOnly = function(){
  var that = persistentData("refresher");

  that.get = function(url){
    return that.storage[url];
  };

  return that;
};

var specialURL = {
  sprawdzianyIndex:{url:"https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dla_stud/studia/sprawdziany/index()",
                    conditionsMet: function(html){
                      //TODO: zdeglobalizowac logowanieUSOS.js
                      //TODO: testy do logowanieUSOS.js
                      
                      //TODO tutaj: sprawdzac czy jestem zalogowany. Jesli nie, to probuje sie zalogowac i zwracam false, jesli tak, to true 
                      //if(!USOS().zalogowany()
                    },                    
                    getRelevantContent: function(html){
                      return $("div#lista", html);
                    }
                    },
  ocenyKoncoweIndex: {
    url: "https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dla_stud/studia/oceny/index()",
    conditionsMet: function(html){
      return true;
    },
    getRelevantContent: function(html){
      return $("table.grey", html); 
    }
  }
};


var urlStruct = function(urlData){
  var that = {};
  var enhanceURL = function(url){
    return specialURL[url] ? specialURL[url] : url;
  };
  that.initContent = function(){
    $.get(enhanceURL(urlData.url), {}, function(data, status, xhr){
      that.content = that.getRelevantContent(xhr.responseText);
    });
  };
  that.getRelevantContent = function(html){
    var url = enhanceURL(urlData.url);
    return specialURL[url] ? specialURL[url].getRelevantContent(html) : html; 
  };
  that.contentChanged = function(html){
      return urlData.content !== that.getRelevantContent(html); 
    };
  that.realURL = function(){
    return enhanceURL(urlData.url);
  };
  that.URL = function(){
    return urlData.url;
  };
  that.getRawData = function(){
    return urlData;
  };
  that.conditionsMet = function(html){
    return specialURL[that.URL()] ? specialURL[that.URL()].conditionsMet(html) : true;
  };
  return that;
};

var urlData = function(url, everyNthSecond){
  var that = {
    url: url,
    everyNthSecond: everyNthSecond,
    content: "notReady"
  };
  urlStruct(that).initContent();  
  return that;
};

var refresherIntervalAlgorithm = function(urlStruct){
  var target = new EventTarget();

  var intervalFunction = function(){
    console.log("refresherIntervalAlgorithm: intervalFunction fired!");
    $.get(urlStruct.realURL(), {}, function(_, status, xhr){
      if(status !== "success"){
        return;
      }
      if(!urlStruct.conditionsMet(xhr.responseText)){
        return;
      }
      
      var notification = webkitNotifications.createNotification(
          'images/icon_48.png',
          'Zmiana na stronie: ', 
          urlStruct.URL());
      if(urlStruct.contentChanged(xhr.responseText)){        
        notification.show();    
      }
    });    
  };
  var that = timeoutIntervalAlgorithm("refresher", target, function(){}, intervalFunction, urlStruct.getRawData(), timeout(),interval(),urlStruct.getRawData().everyNthSecond);
  return that;
};

var urlStorage = function(){
  
  var that = urlStorageReadOnly();

  that.add = function(url){
    that.remove(url);
    that.storage[url] = urlData(url, 5);
    refresherIntervalAlgorithm(urlStruct(that.storage[url])).start();
    that.save();
  };
  
  that.remove = function(url){
    if (that.storage[url]) {
      refresherIntervalAlgorithm(urlStruct(that.storage[url])).stop();
      delete that.storage[url];
      that.save();
    }
  };

  that.size = function(){
    return that.storage.length;
  };
  
  that.restartAlgorithms = function(){
    var i = "";
    for(i in that.storage){
      console.log(i);
      refresherIntervalAlgorithm(urlStruct(that.storage[i])).start();  
    }
  };

  return that;
};
