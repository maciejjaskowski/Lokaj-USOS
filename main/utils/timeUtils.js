

var time = (function(){
	var plStringOfTimeLeftTo = function(tlt){
		  var n = tlt.sign;
		  if(tlt.days > 0 ){
		    n += tlt.days + "\u00a0dni";
		  }
		  else{
		    if(tlt.hs > 0 ){
		      n += tlt.hs + "g. " + Math.abs(tlt.mins) + "min. ";
		    }
		    else{
		      n += tlt.mins + "min. " + Math.abs(tlt.s) + "s" ;
		    }
		  }
		  return n;
		};
		
  var that = {
   days:   ["Nd", "Pon", "Wt", 
            "Sr", "Czw", "Pt", "Sob"],
   months: ["styczen", "luty", "marzec", 
            "kwiecien", "maj", "czerwiec",
            "lipiec", "sierpien", "wrzesien", 
            "pazdziernik", "listopad", "grudzien"],

   secondsToInterval: function(s,sign){
     
     var that = {s: Math.floor(s) % 60,
            mins: Math.floor(s / 60) % (60),
            hs: Math.floor(s / 60 / 60) % (24),
            days: Math.floor(s / 60 / 60 / 24),
            sign:sign};
     that.toString = function(){
     	return plStringOfTimeLeftTo(that);
     };
     return that;
    },

    timeleftTo: function(date){
      var now = new Date();
      var ms = (date - now);
      return that.secondsToInterval(Math.abs(ms) / 1000, (ms > 0 ? "" : "-"));
    }
  };

 //zeroPadding
 that.zp = function(num, nZeros){ 
    var zeros = "";
    while(zeros.length + (num + "").length < nZeros){
      zeros = zeros + "0";
    }
    return zeros + "" + num ;
  };

  that.toPlHtml = function(date){
      var mins = date.getMinutes() + '';
          if(mins.length == 1){
            mins = "0" + mins;
          }
      var dzien = time.days[date.getDay()];
   return dzien + " <br/> " + date.getDate() +"&nbsp;" +time.months[date.getMonth()]  + " " + date.getHours() + ":" + mins; 
  };

  that.toPlText = function(date){
      var mins = that.zp(date.getMinutes(), 2);/*date.getMinutes() + '';
          if(mins.length == 1){
            mins = "0" + mins;
          }*/
      var dzien = time.days[date.getDay()];
   return dzien + " " + date.getDate() +" " +time.months[date.getMonth()]  + " " + date.getHours() + ":" + mins; 
  };

  that.currentInPlText = function(){
    var d = (new Date());
    return d.getDate() + "\u00a0" +
           time.months[d.getMonth()] + " " +
           d.getHours() + ":" + that.zp(d.getMinutes(),2) + ":" + that.zp(d.getSeconds(),2);
  };


  return that;
});


var timeOutGen = (function(setT, clearT, clear){
  var that = {};
  var set = {};

  that.set = function(fun, ms){
    var i = setT(function(){ 
      if(clear){
        that.clear(i);
      }
      fun();
    } , ms);
    set[i] = new Date(new Date().getTime() + ms);
    return i;
  };
  that.clear = function(i){
    clearT(i);
    delete set[i];
  };
  that.show = function(){
    var i;
    for(i in set){
      if(set.hasOwnProperty(i)){
        console.log(i);
        console.log(set[i]);
      }
    }
  };
  return that;
});

var timeout = function(){ return timeOutGen(setTimeout, clearTimeout, true); };
var interval = function(){ return timeOutGen(setInterval, clearInterval, false); };
