$('article p').hide();

$('article a').click(function(){
      // console.log("Click");
      $(this).siblings("p").toggle();
});