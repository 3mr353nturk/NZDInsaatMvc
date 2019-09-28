
$(document).ready(function(){

var totalItemsPop = $('#myCarousel .item').length; 
$('#myCarousel').on('slide.bs.carousel', function() {
       setTimeout(function(){ 
            currentIndexPop = $('#myCarousel div.active').index() + 1;
		    $('.num span').html( '/'+ currentIndexPop + '');
         }, 1000);
   });

// invoke the carousel
    $('#myCarousel').carousel({
      interval: 2000
    });

// scroll slides on mouse scroll 
$('#myCarousel').bind('mousewheel DOMMouseScroll', function(e){

        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            $(this).carousel('prev');
			
        }
        else{
            $(this).carousel('next');
			
			
        }
    });

//scroll slides on swipe for touch enabled devices 

 	$("#myCarousel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
    	$(this).one("touchmove", function(event){

        var yMove = event.originalEvent.touches[0].pageY;
        if( Math.floor(yClick - yMove) > 1 ){
            $(".carousel").carousel('next');
        }
        else if( Math.floor(yClick - yMove) < -1 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});
    

});