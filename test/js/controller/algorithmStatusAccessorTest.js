var time = mockTime();
test("algorithmStatusAccessor", function(){
	var td = $("<td></td>").append("<span></span>");
    var stat = algorithmStatusAccessor(td);
    deepEqual("", stat.get());

    stat.set("cos");
    deepEqual(stat.get(), "cos");

    stat.setAlgorithmRegistered(new Date());
    deepEqual(stat.get(), "Najbliższa próba: PLTEXT");
    deepEqual(td.children().size(),0);

    stat.setAlgorithmSucceeded("<span>a</span>");
    deepEqual(td.children().size(),1);
    deepEqual(stat.get(), "a");

    stat.setAlgorithmStopped();
    deepEqual(td.children().size(),0);
});