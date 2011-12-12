var td;
var $, console;
var EventTarget;

var mockTimeout, mockRequest, notDeepEqual;

var timeOutGen;

var deepEqual, test, module;

var timeoutIntervalAlgorithm;

module("rejestracjaStorage", {setup: function(){ td = $("<td></td>"); }});


  var dollar = $;
  dollar.get = function(url, data, fun){
    var xhr = {};
    xhr.responseText = "responseText";
    fun(data, "success", xhr);
  };
  $ = dollar;
//rejestracja = rejestracja(mockRequest, libTarget);



var subsetEqual = function(result, expectedSubset){
	var i = "";
  for(i in expectedSubset){
    deepEqual(result[i],expectedSubset[i]);
  }
};

var SnatchOnEventTarget = function(libTarget){
  var target = {};
  target.expectStack = [];
  target.msgToListen = 0;
  target.types = {};
  
  var listener = function(msg){    
    if(target.msgToListen >= target.expectStack.length){
      deepEqual(true, false, "Too many messages sent!");
    }else{
      subsetEqual(msg, target.expectStack[target.msgToListen], "Right message sent?");
      target.msgToListen += 1;
    } 
  };
  
  target.expect = function(msg){
    target.expectStack.push(msg);
    if (target.types[msg.type] === undefined) {
      libTarget.addListener(msg.type, listener);
      target.types[msg.type] = true;
    }
  };
  target.setExpect = function(msgList){
    var i;
    for(i = 0; i < msgList.length; i++){
      target.expect(msgList[i]);
    }    
  };
  
  
  target.isOK = function(){
    console.log(target.expectStack);
    console.log(target.msgToListen);
    return target.msgToListen === target.expectStack.length;
  };
  target.fire = function(msg){
    if(target.types[msg.type] === undefined){
      deepEqual(true, false, "Unexpected Message sent! " + msg.type);
    }else{
      libTarget.fire(msg);
    }
  };
  target.addListener = function(type, listener) {return libTarget.addListener(type, listener); };
  
  return target;
};

 var timeoutIntervalAlgorithmForTests = function(name, libTarget, algorytmData, intervalEvents){
   var intervalFunctionIter = 0;
   
   var alg = timeoutIntervalAlgorithm(name, libTarget, function(){
     deepEqual(algorytmData.timeoutHandle, undefined);
     deepEqual(algorytmData.intervalHandle, "");
   }, function(){
     if (intervalFunctionIter < intervalEvents.length) {
       intervalFunctionIter += 1;
       return intervalEvents[intervalFunctionIter - 1]();
     }
      notDeepEqual(intervalFunctionIter, intervalEvents.length, "too many intervals fired?");
  }, algorytmData, mockTimeout(), timeOutGen(function(fun, _){
    fun();
    fun();
  }, function(a){
    alg.intervalClearCount += 1;
  }, false));
  alg.intervalClearCount = 0;
  return alg;
};

  var mockZarejestruj = function(name, id, target){  
    target.fire({type:name + ".intervalFunctionSucceeded",
                      id:id
                    });
  };
  
  var mockNieudanaRejestracja = function(udanaRejestracja, id){
  };

test("registrationAlgorithm:SuccessFail", 

function(){
  var eTarget = new EventTarget();
  var libTarget = SnatchOnEventTarget(eTarget);
  var firstTrialTime = (new Date().getTime());
  var id = "id";
  var algorytmData = {id:id,
     firstTrialTime: firstTrialTime,
     timeToFirstTrial:0,
     timeoutHandle:"",
     intervalHandle:"",
     czasRejestracji:new Date()};
  var name = "name";
  libTarget.setExpect([{type: name + ".timeoutCountingStarted",
          firstTrialTime: firstTrialTime,
                      id: id},
                     {type: name + ".intervalCountingStarted",
                        id: id},
                     {type: name + ".intervalFunctionSucceeded"},
	                   {type: name + ".algorithmStopped",
		                    id: id}]);
  
  
  var alg = timeoutIntervalAlgorithmForTests(name, libTarget, algorytmData,
            [function(){
              mockZarejestruj(name, id, libTarget);
            },function(){
              mockNieudanaRejestracja(function(){
              }, id);
            }]); 

  alg.start();
  deepEqual(alg.intervalClearCount, 1, "number of intervals cleared?");
  deepEqual(libTarget.isOK(), true, "Number of events fired matches?");
});


test("registrationAlgorithm:FailFailNoStop", 
function(){
  var eTarget = new EventTarget();
  var libTarget = SnatchOnEventTarget(eTarget);
  var firstTrialTime = (new Date().getTime());
  var id = "id";
  var algorytmData = {id:id,
     firstTrialTime: firstTrialTime,
     timeToFirstTrial:0,
     timeoutHandle:"",
     intervalHandle:"",
     czasRejestracji:new Date()};
  var name = "name";
  libTarget.setExpect([{type: name + ".timeoutCountingStarted",
                        firstTrialTime: firstTrialTime,
                        id: id},
      {type: name + ".intervalCountingStarted",
                        id: id}]);
  
  
  var alg = timeoutIntervalAlgorithmForTests(name, libTarget, algorytmData,
            [function(){
              mockNieudanaRejestracja(function(){
              }, id);
            },function(){
              mockNieudanaRejestracja(function(){
              }, id);
            }]); 

  alg.start();
  deepEqual(alg.intervalClearCount, 0, "number of intervals cleared?");
  deepEqual(libTarget.isOK(), true, "Number of events fired matches?");
});

test("registrationAlgorithm:FailFailStop", 
function(){
  var eTarget = new EventTarget();
  var libTarget = SnatchOnEventTarget(eTarget);
  var firstTrialTime = (new Date().getTime());
  var id = "id";
  var algorytmData = {id:id,
     firstTrialTime: firstTrialTime,
     timeToFirstTrial:0,
     timeoutHandle:"",
     intervalHandle:"",
     czasRejestracji:new Date()};
  var name = "name";
  libTarget.setExpect([{type: name+".timeoutCountingStarted",
                        firstTrialTime: firstTrialTime,
                        id: id},
{type: name + ".intervalCountingStarted",
                        id: id}, 
                 {type: name + ".algorithmStopped",
                  id:id}]);
  
  
  var alg = timeoutIntervalAlgorithmForTests(name, libTarget, algorytmData,
            [function(){
              mockNieudanaRejestracja(function(){
              }, id);
            },function(){
              mockNieudanaRejestracja(function(){
              }, id);
            }]); 

  alg.start();
  alg.stop();
  deepEqual(alg.intervalClearCount, 1, "number of intervals cleared?");
  deepEqual(libTarget.isOK(), true, "Number of events fired matches?");
});




