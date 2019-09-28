
/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */
var _functions = {};

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, headerH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/
	if(_ismobile) $('body').addClass('mobile');
	_functions.pageCalculations();

	/*============================*/
	/* 04 - function on page load */
	/*============================*/
	$(window).load(function(){
		_functions.initSwiper();
		$('body').addClass('loaded');
		$('#loader-wrapper').fadeOut();
	});

	/*==============================*/
	/* 05 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - function on page scroll */
	/*==============================*/
	
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();

		if (winScr > 130){
			$(".tt-header").addClass("stick fadeInDown animated");
		} else {
			$(".tt-header").removeClass("stick fadeInDown animated");
		}
		
	};
	
	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	var initIterator = 0;

	_functions.initSwiper = function(){
		
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.find('.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):5000,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):1500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        spaceBetween: ($t.is('[data-space-between]'))?parseInt($t.data('space-between'), 10):0,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				onSlideChangeEnd: function(swiper){
					var animationBlocks = $t.find('.swiper-slide-active .text-animation');
					for (var i = 0; i < animationBlocks.length; ++i ){
						$(animationBlocks[i]).addClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
					}
				},		        
				onSlideChangeStart: function(swiper){
					var animationBlocks = $t.find('.swiper-slide-active .text-animation');
					for (var i = 0; i < animationBlocks.length; ++i ){
						$(animationBlocks[i]).removeClass('animated ' + $(animationBlocks[i]).attr("data-animation"));
					}
				},		        
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	/*==============================*/
	/* 08 - buttons, clicks, hovers */
	/*==============================*/

	//menu
	$('.cmn-toggle-switch').on('click', function(e){
		$(this).toggleClass('active');
		$(this).parents('header').find('.toggle-block').slideToggle();
		e.preventDefault();
	});
	$('.main-nav .menu-toggle').on('click', function(e){
		$(this).closest('li').toggleClass('select').siblings('.select').removeClass('select');
		$(this).closest('li').siblings('.parent').find('ul').slideUp();
		$(this).closest('a').siblings('ul').slideToggle();
		e.preventDefault();
	});

	/*tt-load-more*/
	$('.tt-load-more').on('click', function(e){
		var $cloneHtml = $(this).closest('.tt-block').find('.row:first-child').clone();
		$(this).parent().prev().prev().append($cloneHtml)
	  	e.preventDefault();        		
	});

    //Tabs
	var tabFinish = 0;
	$('.tt-nav-tab-item').on('click', function(e){		
	    var $t = $(this);
	    if(tabFinish || $t.hasClass('active')) e.preventDefault();
	    tabFinish = 1;
	    $t.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.tt-nav-tab-item').index(this);
	    $t.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});
	$('.tt-tab-select select').on('change', function(e){
	    var $t = $(this);
	    if(tabFinish) e.preventDefault();
	    tabFinish = 1;    
	    var index = $t.find('option').index($(this).find('option:selected'));
	    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item').removeClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-nav-tab-item:eq('+index+')').addClass('active');
	    $t.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $t.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    	 tabFinish = 0;
	    });
	});

	/*tabs from hash*/
	var hash = location.hash.replace('#', '');
	if(hash){
		hashTab();
	}
	function hashTab(){
		var $tabSel = $('.tt-nav-tab-item[data-tab="' +hash+ '"]').addClass('active');
	    $tabSel.closest('.tt-nav-tab').find('.tt-nav-tab-item').removeClass('active');
	    $tabSel.addClass('active');
	    var index = $tabSel.parent().parent().find('.tt-nav-tab-item').index($tabSel);
	    $tabSel.parents('.tt-tab-wrapper').find('.tt-tab-select select option:eq('+index+')').prop('selected', true);
	    $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info:visible').fadeOut(500, function(){
	    	var $tabActive  = $tabSel.closest('.tt-tab-wrapper').find('.tt-tab-info').eq(index);
	    	$tabActive.css('display','block').css('opacity','0');
	    	$tabActive.animate({opacity:1});
	    });	
	}
	$(window).on("hashchange", function() {
	    if(window.location.hash) {
	        hash = location.hash.replace('#', '');
	        hashTab();
	    }		
	});

	/* accordeon */
	$('.tt-accordeon-title').on('click', function(){
		$(this).closest('.tt-accordeon').find('.tt-accordeon-title').not(this).removeClass('active').next().slideUp();
		$(this).toggleClass('active').next().slideToggle();
		
		
	});		



	/*=====================*/
	/* 12 - LIGHT-BOX */
	/*=====================*/

	
	/*activity indicator functions*/
	var activityIndicatorOn = function(){
		$('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
	};
	var activityIndicatorOff = function(){
		$('#imagelightbox-loading').remove();
	};
	
	/*close button functions*/
	var closeButtonOn = function(instance){
		$('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function(){ $(this).remove(); instance.quitImageLightbox(); return false; });
	};
	var closeButtonOff = function(){
		$('#imagelightbox-close').remove();
	};
	
	/*overlay*/
	var overlayOn = function(){$('<div id="imagelightbox-overlay"></div>').appendTo('body');};
	var overlayOff = function(){$('#imagelightbox-overlay').remove();};
	
	/*caption*/
	var captionOff = function(){$('#imagelightbox-caption').remove();};
	var captionOn = function(){
		var description = $('a[href="' + $('#imagelightbox').attr('src') + '"]').data('title');
		if(description.length)
			$('<div id="imagelightbox-caption">' + description +'</div>').appendTo('body');
	};

	/*arrows*/
    var arrowsOn = function(instance, selector) {
        var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>');
        $arrows.appendTo('body');
        $arrows.on('click touchend', function(e) {
            e.preventDefault();
            var $this = $(this);
            if( $this.hasClass('imagelightbox-arrow-left')) {
                instance.loadPreviousImage();
            } else {
                instance.loadNextImage();
            }
            return false;
        });
    };	
	var arrowsOff = function(){$('.imagelightbox-arrow').remove();};	
			
	var selectorG = '.lightbox';
	if($(selectorG).length){
		var instanceG = $(selectorG).imageLightbox({
			quitOnDocClick:	false,
			onStart:		function() {arrowsOn(instanceG, selectorG);overlayOn(); closeButtonOn(instanceG);},
			onEnd:			function() {arrowsOff();captionOff(); overlayOff(); closeButtonOff(); activityIndicatorOff();},
			onLoadStart: 	function() {captionOff(); activityIndicatorOn();},
			onLoadEnd:	 	function() {$('.imagelightbox-arrow').css('display', 'block');captionOn(); activityIndicatorOff();}
		});		
	}	
	
	
	
	/* homepage owl slider  */
	
	//project carousel 
	
	var owl = $('.owl-carousel1');
		owl.owlCarousel({
		margin: 30,
		nav: true,
		loop: true,
		autoplay:true,
		autoplayTimeout:1000,
		autoplayHoverPause:true,
		responsive: {
			0: {
			items: 1,
			
			}, 
			600: {
			margin: 0,
			items: 2
			},
			767:{
			margin: 30,
			items: 2,
			},
			1000: {
			items: 3
			}
		}
	})
		$('.play').on('click',function(){
			owl.trigger('play.owl.autoplay',[1000])
		})
		$('.stop').on('click',function(){
			owl.trigger('stop.owl.autoplay')
		})
	
	
	// client-logo carousel
	
	var owl = $('.owl-carousel2');
		owl.owlCarousel({
		margin: 0,
		nav: true,
		loop: true,
		autoplay:true,
		autoplayTimeout:1000,
		autoplayHoverPause:true,
		responsive: {
			0: {
			items: 1
			},
			414: {
			items: 2
			},
			600: {
			items: 3
			},
			1000: {
			items: 4
			},
			1200: {
			items: 5
			}
		}
	})
	
	// homepage 1
	$('.owl-carousel3 ').owlCarousel({
                loop: true,
                margin: 10,
				nav: true,
				loop: true,
				nav: true,
				autoplay:true,
				smartSpeed: 1500, 
				autoplayHoverPause:false,
				fluidSpeed:true,
                responsive: {
                  0: {
                    items: 1,
                   
                  },
                  600: {
                    items: 1,
                   
					
                  },
                  1000: {
                    items: 1,
                
                  }
                }
				
              })
			   $( ".owl-prev").html('<i class="icofont icofont-thin-left"></i>');
 $( ".owl-next").html('<i class="icofont icofont-thin-right"></i>');
	
	
	// about us page - team section carousel
	
	$('.owl-carousel4 ').owlCarousel({
                loop: true,
                margin: 30,
				loop: true,
				dots: true,
				autoplay:true,
				smartSpeed: 1500,
				pagination:false,
				navigation:true	,			
				autoplayHoverPause:false,
				fluidSpeed:true,
                responsive: {
                  0: {
                    items: 1,
                   
                  },
                  600: {
                    items: 2,
                  },
                  992: {
                    items: 3,
                
                  }
                }
				
              })
	
	// about us page - customer section carousel
	
	$('.owl-carousel5 ').owlCarousel({
                loop: true,
                margin: 30,
				loop: true,
				dots: true,
				autoplay:true,
				smartSpeed: 1500,
				pagination:false,
				navigation:true	,			
				autoplayHoverPause:false,
				fluidSpeed:true,
                responsive: {
                  0: {
                    items: 1,
                   
                  },
                  600: {
                    items: 1,
                  },
                  991: {
                    items: 2,
                
                  }
                }
				
              })
	
			
		// project detail page - related projects
			
			$('.owl-carousel6 ').owlCarousel({
						margin: 30,
						loop: true,
						dots: true,
						nav: true,
						autoplay:true,
						smartSpeed: 1500,
						pagination:false,
						navigation:true	,			
						autoplayHoverPause:false,
						fluidSpeed:true,
						responsive: {
						  0: {
							items: 1,
						   
						  },
						  414: {
							items: 2,
						  },
						  767: {
							items: 3,
						  },
						   991: {
							items: 4,
						  },
						  1500: {
							items: 5,
						  }
						}
				
		  })
			$( ".owl-prev").html('<i class="icofont icofont-rounded-left"></i>');
			$( ".owl-next").html('<i class="icofont icofont-rounded-right"></i>');
	
	//project carousel 
	
	var owl = $('.owl-carousel7');
		owl.owlCarousel({
		margin: 0,
		nav: true,
		loop: true,
		autoplay:true,
		autoplayTimeout:1000,
		autoplayHoverPause:true,
		responsive: {
			0: {
			items: 1
			},
			500: {
			items: 2
			},
			650: {
			items: 2
			},
			767: {
			items: 3
			},
			1000: {
			items:4
			},
			1200: {
			items:5
			}
		}
	})
		$('.play').on('click',function(){
			owl.trigger('play.owl.autoplay',[1000])
		})
		$('.stop').on('click',function(){
			owl.trigger('stop.owl.autoplay')
		})			
				
		// home page 5 counter
		 $('.strip_01 .services_1 h2').each(function () {
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
				duration: 25000,
				easing: 'swing',
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	// barfiller for maintenance
	$('.barfiller1').barfiller({ barColor: '#f2c21a' });
	// shop-detail
	$('.input-number-increment').click(function() {
			  var $input = $(this).parents('.input-number-group').find('.input-number');
			  var val = parseInt($input.val(), 10);
			  $input.val(val + 1);
			});

			$('.input-number-decrement').click(function() {
			  var $input = $(this).parents('.input-number-group').find('.input-number');
			  var val = parseInt($input.val(), 10);
			  $input.val(val - 1);
			})
				
	// Page Loaded...
	
	try {

	  var ZoomImage = jQuery('.zoom, .zoom-image');
	    ZoomImage.magnificPopup({
	        type: 'image',
	         gallery: {
	            enabled: true
	        }
	    });
	  } catch(err) {
	}

});


function customTabSingleService () {
    if ($('.tabmenu-box').length) {
        var tabWrap = $('.tab-content-box');
        var tabClicker = $('.tabmenu-box ul li');
        
        tabWrap.children('div').hide();
        tabWrap.children('div').eq(0).show();
        tabClicker.on('click', function() {
            var tabName = $(this).data('tab-name');
            tabClicker.removeClass('active');
            $(this).addClass('active');
            var id = '#'+ tabName;
            tabWrap.children('div').not(id).hide();
            tabWrap.children('div'+id).fadeIn('500');
            return false;
        });        
    }
}

// Dom Ready Function
jQuery(document).on('ready', function () {
	(function ($) {
        // add your functions
        customTabSingleService ();
	})(jQuery);
});
