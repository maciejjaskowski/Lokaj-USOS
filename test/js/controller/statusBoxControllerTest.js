var time = mockTime();


test("statusBoxControllerTest", function(){
  var td = $("<td></td>").append("<span></span>");

  var span = $("span", td);
  var times = {fadeOut: 100, toFadeOut: 300, toRemove: 600};
  var stat = statusBoxController(span, times);
  
  stat.setWaiting();
  deepEqual(stat.get(), "CURRENTINPLTEXT");
  stat.set("");
  deepEqual(stat.get(), "");

  stat.setSuccOrFail(true);
  deepEqual(stat.get(), "CURRENTINPLTEXT");
  stat.set("");
  deepEqual(stat.get(), "");


  stat.setSuccOrFail(false);
  deepEqual(stat.get(), "CURRENTINPLTEXT");
  console.log(span.css("display", "inline"));
  //nie wiem jak przetestować fadeIn, fadeOut :/
});
