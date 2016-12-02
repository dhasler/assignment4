(function() {
  var internal_DB;
  console.log('Keepin\'n it clean with an external script!');

  $.ajax({
    url: "http://www.mattbowytz.com/simple_api.json?data=all",
    async: false,
    success: function(data){
      internal_DB = data.data;
      $('#SearchyMcSearchFace').attr('disabled', false);
      $('#SearchyMcSearchFace').attr('placeholder', 'Search...');
    }
  });
  $.ajax({
    url: "http://www.mattbowytz.com/simple_api.json?data=comics",
    async: false,
    success: function(data){
      //var temp = jQuery.parseJSON('{"comics" : ' + JSON.stringify(data.data) + '}');
      internal_DB['comics'] = data.data;

    }
  });
  console.log(internal_DB);

  $('#SearchyMcSearchFace').on('keyup', function(){
    var dis = $(this);
    var test_val = dis.val();
    var comics = new Array();
    var programming = new Array();
    var interests = new Array();
    console.log(dis.val().length);
    if(dis.val().length > 0){
      $("#no_res").remove();
      for(i = 0; i < internal_DB.comics.length; i++){
        if(~internal_DB.comics[i].toLowerCase().indexOf(test_val.toLowerCase())){
          comics.push(internal_DB.comics[i]);
        }
      }
      for(i = 0; i < internal_DB.programming.length; i++){
        if(~internal_DB.programming[i].toLowerCase().indexOf(test_val.toLowerCase())){
          programming.push(internal_DB.programming[i]);
        }
      }
      for(i = 0; i < internal_DB.interests.length; i++){
        if(~internal_DB.interests[i].toLowerCase().indexOf(test_val.toLowerCase())){
          interests.push(internal_DB.interests[i]);
        }
      }
      if($('#results').length > 0){

      }
      else{
        dis.after("<div id='results'></div>");
      }
      if(comics.length > 0){
        $("#comics").remove();
        $("[data-link='comics']").remove();
        var comic_data = "";
        for(i = 0; i < comics.length; i++){
          comic_data += "<li><a href='https://www.google.com/#q=" + comics[i] + "' target='_target'>" + comics[i] + "</a></li>";
        }

        comic_sing = "s";
        if(comics.length == 1)
          comic_sing = "";

        $("#results").append("<span id='comics'>" + comics.length+ " result" + comic_sing + " in: Comics</span><ul data-link='comics'>" + comic_data + "</ul>")
      }
      else{
        $("#comics").remove();
        $("[data-link='comics']").remove();
      }
      
      if(programming.length > 0){
        $("#programming").remove();
        $("[data-link='programming']").remove();
        var programming_data = "";
        for(i = 0; i < programming.length; i++){
          programming_data += "<li><a href='https://www.google.com/#q=" + programming[i] + "' target='_blank'>" + programming[i] + "</a></li>";
        }

        programming_sing = "s";
        if(programming.length == 1)
          programming_sing = "";

        $("#results").append("<span id='programming'>" + programming.length + " result" + programming_sing + " in: Programming</span><ul data-link='programming'>" + programming_data + "</ul>")
      }
      else{
        $("#programming").remove();
        $("[data-link='programming']").remove();
      }

      if(interests.length > 0){
        $("#interests").remove();
        $("[data-link='interests']").remove();
        var interests_data = "";
        for(i = 0; i < interests.length; i++){
          interests_data += "<li><a href='https://www.google.com/#q=" + interests[i] + "' target='_blank'>" + interests[i] + "</a></li>";
        }

        interests_sing = "s";
        if(interests.length == 1)
          interests_sing = "";

        $("#results").append("<span id='interests'>" + interests.length+ " result" + interests_sing + " in: Interests</span><ul data-link='interests'>" + interests_data + "</ul>")
      }
      else{
        $("#interests").remove();
        $("[data-link='interests']").remove();
      }

      if($("#results").find("ul").length == 0){
        $("#results").html("<span id='no_res'>No Results!</span>");
      }
    }
    else if(dis.val().length == 0){
      $("#results").remove();     
    }
  })
})();