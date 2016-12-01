// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

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
    if(dis.length > 0){
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
          comic_data += "<li>" + comics[i] + "</li>";
        }

        $("#results").append("<span id='comics'>Results in: Comics</span><ul data-link='comics'>" + comic_data + "</ul>")
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
          programming_data += "<li>" + programming[i] + "</li>";
        }

        $("#results").append("<span id='programming'>Results in: Programming</span><ul data-link='programming'>" + programming_data + "</ul>")
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
          interests_data += "<li>" + interests[i] + "</li>";
        }

        $("#results").append("<span id='interests'>Results in: Interests</span><ul data-link='interests'>" + interests_data + "</ul>")
      }
      else{
        $("#interests").remove();
        $("[data-link='interests']").remove();
      }

      dis.animate({'borderBottomLeftRadius': '0', 'borderBottomRightRadius': '0'});
    }
    else if(dis.length == 0){
    }
  })
})();