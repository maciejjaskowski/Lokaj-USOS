var setupFacebook = function(){
  $("#facebook").append("<p id='facebook_waiting'>czekam na facebook</p>");
  $("#facebook").append(
'<iframe id=\"facebook_iframe\" src="http://www.facebook.com/plugins/like.php?locale=pl_PL&href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FLokaj-USOS%2F181056061927765%3Fv%3Dinfo&amp;layout=standard&amp;show_faces=true&amp;width=400&amp;action=recommend&amp;colorscheme=light&amp;height=68" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:400px; height:68px;" allowTransparency="true"></iframe>');
  $("#facebook_iframe").hide();
  $("#facebook_iframe").load(function(){
        $("#facebook_waiting").detach();
        $("#facebook_iframe").fadeIn(1000);
      });
};