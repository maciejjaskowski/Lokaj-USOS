
var regexp = new RegExp('https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dla_stud/studia/podania/listaZlozonych()');


var regexp2 = new RegExp('https://usosweb.mimuw.edu.pl/kontroler.php?_action=actionx:dla_stud/studia/podania/podanie(_pod_id:1426;_inst_www_kod:MIMUW_WWW)');

var findTable = function(doc){
  return $("table.wrnav", doc).first();
};

var getRows = function(table){
  return $("tr.odd_row,tr.even_row", table);
};

var getAllRows = function(table){
  return $("tr.odd_row,tr.even_row,tr:has(th)", table);
};

var getFirstColumns = function(rows){
  return $("td:first", rows);
};

var getAllFirstColumns = function(rows){
  return $("td:first,th:first", rows);
};

$(getAllRows(findTable())).prepend("<td></td>");
$(getFirstColumns(getAllRows(findTable()))).first().text("Lokaj");
$(getFirstColumns(getRows(findTable()))).prepend(newCheckButton());

