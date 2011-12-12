var chrome, console, localStorage;
var $;
var EventTarget;
var refresherIntervalAlgorithm, algorithmData, urlStorage;


var libTarget = new EventTarget();
var request = request();
var rejestracja = rejestracja(request, libTarget);
var refresher = urlStorage();

var time = time();
var setBadge = function(){
  chrome.browserAction.setBadgeText({text:rejestracja.size() +''});
};

var setIcon = function(){
  var onTime = function(){
    var timeIsClose = false;
    rejestracja.forEachDomain(function(_, url){
        $.each(url, function(key, rej){
           if (!url.hasOwnProperty(key)) {
		   	return;
		   } 
            var tlt = time.timeleftTo(new Date(rej.czasRejestracji));
            if(tlt.days < 1 && tlt.hs >= -2){
              timeIsClose = true;
            }
          });
        });
    if(timeIsClose){
      chrome.browserAction.setIcon({path:"images/icon_red.png"});
    }
    else{
      chrome.browserAction.setIcon({path:"images/icon.png"});
    }
  };
  libTarget.addListener("time", function(msg){ onTime(); });
  onTime();
};


libTarget.addListener("nrOfRejestracjaChanged",
    function(msg){
      setBadge();
    });

setBadge();
setIcon();
setInterval( function(){ libTarget.fire("time", new Date()); }, 15000);
rejestracja.restartAlgorithms();
refresher.restartAlgorithms();

//refresherIntervalAlgorithm(algorithmData("sprawdzianyIndex",5)).start();
