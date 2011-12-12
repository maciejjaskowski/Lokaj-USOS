
module("time");
var time = time();
test("secondsToInterval", function(){
	var sec = time.secondsToInterval(0,1);
  deepEqual(sec.s,0);
  deepEqual(sec.mins,0);
  deepEqual(sec.hs,0);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);
});  
  sec = time.secondsToInterval(1,1);
  deepEqual(sec.s,1);
  deepEqual(sec.mins,0);
  deepEqual(sec.hs,0);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);

  sec = time.secondsToInterval(60,1);
  deepEqual(sec.s,0);
  deepEqual(sec.mins,1);
  deepEqual(sec.hs,0);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);
  
  sec = time.secondsToInterval(60*59 + 59,1);
  deepEqual(sec.s,59);
  deepEqual(sec.mins,59);
  deepEqual(sec.hs,0);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);
  
  sec = time.secondsToInterval(60*60,1);
  deepEqual(sec.s,0);
  deepEqual(sec.mins,0);
  deepEqual(sec.hs,1);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);
  
  sec = time.secondsToInterval(60*60*23 + 60*59 + 59,1);
  deepEqual(sec.s,59);
  deepEqual(sec.mins,59);
  deepEqual(sec.hs,23);
  deepEqual(sec.days,0);
  deepEqual(sec.sign,1);
  
  
  
  sec = time.secondsToInterval(60*60*24,1);
  deepEqual(sec.s,0);
  deepEqual(sec.mins,0);
  deepEqual(sec.hs,0);
  deepEqual(sec.days,1);
  deepEqual(sec.sign,1);
  
  sec = time.secondsToInterval(60*60*24 + 60*60 + 60 + 1,1);
  deepEqual(sec.s,1);
  deepEqual(sec.mins,1);
  deepEqual(sec.hs,1);
  deepEqual(sec.days,1);
  deepEqual(sec.sign,1);
});


test("toPlHtml", 2, function(){
     deepEqual(time.toPlHtml(new Date("02 15 2011 13:44")), "Wt <br/> 15&nbsp;luty 13:44");
     deepEqual(time.toPlHtml(new Date("02 15 2011 13:04")), "Wt <br/> 15&nbsp;luty 13:04");
});

test("toPlText", 3, function(){
     deepEqual(time.toPlText(new Date("02 15 2011 13:44")), "Wt 15 luty 13:44");
     deepEqual(time.toPlText(new Date("02 15 2011 13:04")), "Wt 15 luty 13:04");
     deepEqual(time.toPlText(new Date("02 15 2011 5:00")), "Wt 15 luty 5:00");
    });


test("zeroPadding", 12, function(){
    deepEqual("0", time.zp(0, 0));
    deepEqual("1", time.zp(1, 0));
    deepEqual("1000", time.zp(1000, 0));

    deepEqual("0", time.zp(0, 1));
    deepEqual("5", time.zp(5, 1));
    deepEqual("1000", time.zp(1000, 1));

    deepEqual("00", time.zp(0, 2));
    deepEqual("05", time.zp(5, 2));
    deepEqual("1000", time.zp(1000, 2));

    deepEqual("00000", time.zp(0, 5));
    deepEqual("00005", time.zp(5, 5));
    deepEqual("01000", time.zp(1000, 5));
    });

