  var timeoutIntervalAlgorithm = function(name, target, timeoutFunction, intervalFunction,algorytmData,
      timeOut, interval, everyNthSecond){
    var that = {};
    var ens = everyNthSecond ? everyNthSecond*1000 : 500;
    algorytmData.stat = "registered";

    that.start = function(){
		target.fire({type: name + ".timeoutCountingStarted",
		             firstTrialTime: algorytmData.firstTrialTime,
					 id: algorytmData.id});
           
      algorytmData.timeoutHandle = timeOut.set(
        function(){
          algorytmData.stat = "started";
          delete algorytmData.timeoutHandle;
          timeoutFunction();
		      target.fire({type: name + ".intervalCountingStarted",
		                     id: algorytmData.id});
          target.addListener(name + ".intervalFunctionSucceeded",
            function(msg){				
              if (msg.id === algorytmData.id) {
      			  	that.stop();
			        }
            });

          algorytmData.intervalHandle = interval.set(
            function(){ 
                intervalFunction();
              }, ens);

        }, algorytmData.timeToFirstTrial);
    };
    
    that.stop = function(){
        algorytmData.stat = "stopped";
 
          algorytmData.timeoutHandle = "";
          delete algorytmData.timeoutHandle;
  
          interval.clear(algorytmData.intervalHandle);
          delete algorytmData.intervalHandle;

        target.fire({type: name + ".algorithmStopped", id: algorytmData.id});
    };
    return that;
  };

