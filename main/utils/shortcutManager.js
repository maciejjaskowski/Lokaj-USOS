var shortcutManager = function(){
   var that = {};
   that.reg = {};
   that.register = function(keyId, fun, desc){
     that.reg[keyId] = {fun:fun, desc:desc};
   };
   that.unregister = function(keyId){
     delete that.reg[keyId];
   };
   that.reset = function(){
     delete that.reg;
     that.reg = {};
   };
   that.click = function(event){
     if(that.reg[event.keyIdentifier]){
       return that.reg[event.keyIdentifier].fun(event);
     }
     return true;
   };
   that.legend = function(){
     var table = $("<table></table>");
//     table.append("<tr><th colspan=2> skróty </th></tr>");
     for(s in that.reg){
       if(that.reg.hasOwnProperty(s)){
         var unic = JSON.parse('"' + (s.replace("U+","\\u")) + '"');
         var tr = $("<tr></tr>");
         tr.append("<td class='left'>" + unic + "</td>");
         tr.append("<td class='right'>" + that.reg[s].desc + "</td>");
         table.append(tr);
       }
     }
     return table;
   };
   return that;
 };

