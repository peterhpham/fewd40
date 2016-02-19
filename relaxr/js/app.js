$( document ).ready(function() {


    $(".hideOnLoad").hide();


    $(".signup-cta").click(function(event){
        event.preventDefault();
        // console.log("prevented")
    });

    $(".read-more").click(function(){
          // console.log("Read more is clicked");
          $(this).siblings("p").slideDown();
          $(this).hide();
          $(this).siblings(".read-less").show();
    });

    $(".read-less").click(function(){
          // console.log("Read less is clicked");
          $(this).siblings("p.additional").slideUp();
          $(this).hide();
          $(this).siblings(".read-more").show();
    });


    $(".learn-more").click(function(){
          // console.log("Learn more is clicked");
          $(this).siblings("p").slideDown();
          $(this).hide();
    });

});