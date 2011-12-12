var jQuery, $, JSON;
var console;

var EventTarget;
var localStorage, persistentData;
var timeout, interval;
var timeoutIntervalAlgorithm;
var zarejestruj;

var devel = false;

  var rejestracjaGetID = function(rej){
    return {urlDomena:rej.urlDomena, urlDoRejestracji:rej.urlDoRejestracji, id:rej.id};
  };


var rejestracjaReadOnly = function(){
  var rejestracja = persistentData("rejestracja");

  rejestracja.forEachDomain = function(fun){
    var i = "";
    for(i in rejestracja.storage){
      if(rejestracja.storage.hasOwnProperty(i)){
            fun(i,rejestracja.storage[i]);
      }
    }
  };

  rejestracja.forEachRegistration = function(fun){
    var j = "";
    rejestracja.forEachDomain(function(domain, struct){
          for(j in struct){
            if(struct.hasOwnProperty(j)){
              fun(struct[j]);
            }
          }
        });
  };

  rejestracja.get = function(rejID){
	  if(rejID === undefined){
		  return undefined;
	  }
    return rejestracja.storage[rejID.urlDomena][rejID.urlDoRejestracji];
  };

  return rejestracja;
};

var udanaRejestracja = function(wynik){
  return jQuery(".msg_confirm", wynik).length == 1;
};

var rejestracja = function(request, libTarget){
  var mTimeout = timeout();
  var mInterval = interval();
  if(!localStorage.rejestracja){
    localStorage.rejestracja = JSON.stringify({});
  }


  var registrationAlgorithm = function(algorytmData){
    var target = new EventTarget();
	console.log("algorytmData");
	console.log(rej.algorytmData);
//libTarget,
    target.addListener("registration.timeoutCountingStarted",
      function(){
        request.send({type: "rejestracja_status",
                    stat: "waiting",
                    firstTrialTime: algorytmData.firstTrialTime,
                    rejID: algorytmData.rejID}, function(){});
      });
      target.addListener("registration.intervalCountingStarted",
      function(){
        request.send(
            {type: "algorithmStarted",
             rejID: algorytmData.rejID  }, 
            function(){});
      });
      target.addListener("registration.intervalFunctionSucceeded",
      function(){      
      });
      
      target.addListener("registration.algorithmStopped",
      function(){
        request.send({type: "algorithmStopped",
                      rejID: algorytmData.rejID}, function(){});
      });
    algorytmData.id = algorytmData.rejID.id;       
    return timeoutIntervalAlgorithm("registration", 
                               target,
                               rejestracja.save, 
                               function(){return zarejestruj(udanaRejestracja, algorytmData.rejID);},
                               algorytmData, 
                               mTimeout, 
                               mInterval); 
  };

  var zarejestruj = function(udanaRejestracja, rejID){
    var statusId = (new Date()).getTime();

    request.send({type: "registrationTrialStart",
                              rejID: rejID,
                              statusId: statusId}, function(){});

    console.log('Probuje rejestrowac!');

    $.get(rejID.urlDoRejestracji, {},
      function(data, status, xhr){
        var udana = udanaRejestracja(xhr.responseText);
        if(udana){
          libTarget.fire({type:"registrationTrialSucceeded",
                          who: rejID.id,
                          val: true});
          request.send({type: "registrationTrial",
                              rejID: rejID,
                              val: true,
                              statusId: statusId,
                              responseText: xhr.responseText},
                              function(){});
        }else{
          libTarget.fire({type:"registrationTrialFailed",
                          who: rejID.id,
                          val: false});
          request.send({type: "registrationTrial",
                              rejID: rejID,
                              val: false,
                              statusId: statusId}, function(){});
        }
      });
  };

  var createAlgorithmData = function(rejID, czasRejestracji){
    var that = {};
    var t = new Date(czasRejestracji).getTime();
    var curT = new Date().getTime();
    that.firstTrialTime = t - 1000 * 120;
    that.timeToFirstTrial = that.firstTrialTime - curT;
    that.timeoutHandle = undefined;
    that.intervalHandle = undefined;
    that.rejID = rejID;
    that.czasRejestracji = czasRejestracji;
    return that;
  };

  var rejestracja = rejestracjaReadOnly();

  rejestracja.remove = function(rejID){
    delete rejestracja.storage[rejID.urlDomena][rejID.urlDoRejestracji];
    rejestracja.save();
  };

  rejestracja.removeByID = function(rejID){
    var rej = rejestracja.get(rejID);
    if(rej.algorytm && rej.algorytm.stop){
      rej.algorytm.stop();
      delete rej.algorytm;
    }
    rejestracja.remove(rej);
    request.send({type: "registrationChanged", rejID: rejID, val:false}, function(){});
    libTarget.fire("nrOfRejestracjaChanged");
  };

  request.onRequest.addListener(
      function(msg, sender, sendResponse){
        if(msg.type === "removeRegistration"){
          rejestracja.removeByID(msg.rejID);
          sendResponse({});
        }
      });

  rejestracja.change = function(msg){
    var rej = rejestracja.get(msg.rejID);
    if(msg.czasRejestracji){ //tylko devel
      rej.czasRejestracji = msg.czasRejestracji;
    }

    if(typeof(msg.auto) === "boolean"){
      if(msg.auto){
        rej.algorytmData = (createAlgorithmData(rejestracjaGetID(rej),rej.czasRejestracji));
        registrationAlgorithm(rej.algorytmData).start();
      }else{
        registrationAlgorithm(rej.algorytmData).stop();
        delete rej.algorytmData;
      }
    }
    rejestracja.save();
    request.send({type: "registrationChanged", rejID: msg.rejID, val:msg.val}, function(){});
  };

  request.onRequest.addListener(
      function(msg, sender, sendResponse){
        if(msg.type === "changeRejestracja"){
          rejestracja.change(msg);
          sendResponse({});
        }
      });

  //dodaje lub usuwa
  //domyslnie auto = false
  rejestracja.add = function(rej){
    if(!rejestracja.storage[rej.urlDomena]){
      rejestracja.storage[rej.urlDomena] = {};
    }

    rejestracja.storage[rej.urlDomena][rej.urlDoRejestracji] = rej;

    rejestracja.save();
    request.send({type: "registrationChanged", rejId: rej.id, val: true},function(){});
    libTarget.fire("nrOfRejestracjaChanged");
  };

  request.onRequest.addListener(
      function(msg, sender, sendResponse){
        if(msg.type === "addRegistration"){
          rejestracja.add(msg.rej);
          sendResponse({});
        }
      });

  rejestracja.size = function(){
    var count = 0;
    rejestracja.forEachRegistration(function(_){
        count++;
      });
    return count;
  };

  rejestracja.restartAlgorithms = function(){
    rejestracja.forEachDomain(function(_, url){
          $.each(url, function(key, rej){
              if(rej.algorytmData){
                registrationAlgorithm(rej.algorytmData).start();
                rejestracja.save();
              }
            });
        });
  };

  request.onRequest.addListener(
      function(msg, sender, sendResponse){
        if(msg.type === "registrationExists"){
          sendResponse(rejestracja.get(msg.rejID) ? true : false);
        }
      });

  rejestracja.forTests = {zarejestruj:zarejestruj};
  return rejestracja;
};
