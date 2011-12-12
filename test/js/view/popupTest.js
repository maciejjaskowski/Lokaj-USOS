module("popup", {setup: function(){ td = $("<td></td>"); }});


var td;
var time = mockTime();


//module("tdStatus");
//
//test("tdStatus", 2, function(){
//  request = mockRequest();
//  var id = "moje_id";
//  var stat = tdStatus(id);
//
//  console.log(stat);
//  deepEqual(stat.span.text(), "");
//  request.send({type: "registrationTrial",
//                statusId: id}, function(){
//                });
//  for(i = 0; i < 1000; i++){
//    if(stat.span.text() === "CURRENTINPLTEXT"){
//      break;
//    }
//  }
//  deepEqual(stat.span.text(), "CURRENTINPLTEXT");
//});

