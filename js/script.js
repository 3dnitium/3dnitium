$(document).ready(function () {

    var winW = $(window).width();
    var winH = $(window).height();

    $(window).on('scroll', function(){
        var scrTop = $(window).scrollTop();

        if (scrTop > 100) {
            $('.header').addClass('top');
        } else {
            $('.header').removeClass('top');
        }
    });

    $(window).on('resize', function(){
        var winW = $(window).width();
        var winH = $(window).height();
        
        $('.main-section').css('min-height', winH);

        if (winW > 1024) {
            $('.nav-show-btn').removeClass('show');
            $('.nav-list').removeClass('show');
        }

        
    });

    $('.main-section').css('min-height', winH);

    $('.nav-show-btn').on('click', function(){
        $(this).toggleClass('show');
        $('.nav-list').toggleClass('show');
        $('body').toggleClass('no-scroll');
    });

    $('.nav-list li a').on('click', function(){
    	$('.nav-show-btn').removeClass('show');
        $('.nav-list').removeClass('show');
        $('body').removeClass('no-scroll');
    });

    $('.main-section').on('click', function(){
        $('.nav-show-btn').removeClass('show');
        $('.nav-list').removeClass('show');
        $('body').removeClass('no-scroll');
    });



    $('.particles').each(function(n,l){
		// var elmCount = $('.particles').length;
		
		var setParticleId = $(this).attr('id', 'paticles_'+ n);
		var getParticleId = $(this).attr('id');
		particlesJS(getParticleId, 
		{
			"particles": {
				"number": {
					"value": 50,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 3,
						"color": "#086a9f"
					},
					"polygon": {
						"nb_sides": 8
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.5,
					"random": false,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 3,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 2.5,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 150,
					"color": "#086a9f",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 2.5,
					"direction": "none",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": true,
						"mode": "grab"
					},
					"onclick": {
						"enable": true,
						"mode": "repulse"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 300,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 8,
						"speed": 3
					},
					"repulse": {
						"distance": 200,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		})
	});

	+function ($) {
	  'use strict';

	  // SCROLLSPY CLASS DEFINITION
	  // ==========================

	  function ScrollSpy(element, options) {
	    var href
	    var process  = $.proxy(this.process, this)

	    this.$element       = $(element).is('body') ? $(window) : $(element)
	    this.$body          = $('body')
	    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
	    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
	    this.selector       = (this.options.target
	      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
	      || '') + ' .nav li > a'
	    this.offsets        = $([])
	    this.targets        = $([])
	    this.activeTarget   = null

	    this.refresh()
	    this.process()
	  }

	  ScrollSpy.DEFAULTS = {
	    offset: 10
	  }

	  ScrollSpy.prototype.refresh = function () {
	    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

	    this.offsets = $([])
	    this.targets = $([])

	    var self     = this
	    var $targets = this.$body
	      .find(this.selector)
	      .map(function () {
	        var $el   = $(this)
	        var href  = $el.data('target') || $el.attr('href')
	        var $href = /^#./.test(href) && $(href)

	        return ($href
	          && $href.length
	          && $href.is(':visible')
	          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
	      })
	      .sort(function (a, b) { return a[0] - b[0] })
	      .each(function () {
	        self.offsets.push(this[0])
	        self.targets.push(this[1])
	      })
	  }

	  ScrollSpy.prototype.process = function () {
	    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
	    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
	    var maxScroll    = scrollHeight - this.$scrollElement.height()
	    var offsets      = this.offsets
	    var targets      = this.targets
	    var activeTarget = this.activeTarget
	    var i

	    if (scrollTop <= offsets[0]) {
	      this.deactivate();
	      return;
	    }

	    if (scrollTop >= maxScroll) {
	      return activeTarget != (i = targets.last()[0]) && this.activate(i)
	    }

	    if (activeTarget && scrollTop <= offsets[0]) {
	      return activeTarget != (i = targets[0]) && this.activate(i)
	    }

	    for (i = offsets.length; i--;) {
	      activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
	        && this.activate( targets[i] )
	    }
	  }

	  ScrollSpy.prototype.activate = function (target) {
	    this.activeTarget = target

	    $(this.selector)
	      .parentsUntil(this.options.target, '.active')
	      .removeClass('active')

	    var selector = this.selector +
	        '[data-target="' + target + '"],' +
	        this.selector + '[href="' + target + '"]'

	    var active = $(selector)
	      .parents('li')
	      .addClass('active')

	    if (active.parent('.dropdown-menu').length) {
	      active = active
	        .closest('li.dropdown')
	        .addClass('active')
	    }

	    active.trigger('activate.bs.scrollspy')
	  }

	  ScrollSpy.prototype.deactivate = function (target) {
	    $(this.selector)
	      .parent('.active')
	      .removeClass('active');
	    this.activeTarget = null;
	  }


	  // SCROLLSPY PLUGIN DEFINITION
	  // ===========================

	  var old = $.fn.scrollspy

	  $.fn.scrollspy = function (option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.scrollspy')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  $.fn.scrollspy.Constructor = ScrollSpy


	  // SCROLLSPY NO CONFLICT
	  // =====================

	  $.fn.scrollspy.noConflict = function () {
	    $.fn.scrollspy = old
	    return this
	  }


	  // SCROLLSPY DATA-API
	  // ==================

	  $(window).on('load', function () {
	    $('[data-spy="scroll"]').each(function () {
	      var $spy = $(this)
	      $spy.scrollspy($spy.data())
	    })
	  })

	}(jQuery);

	$('body').scrollspy({target: ".nav-list", offset: 50});

	$(".nav-list a").on('click', function(event) {

	  // Make sure this.hash has a value before overriding default behavior
	  if (this.hash !== "") {

	    // Prevent default anchor click behavior
	    event.preventDefault();

	    // Store hash
	    var hash = this.hash;

	    // Using jQuery's animate() method to add smooth page scroll
	    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	    $('html, body').animate({
	      scrollTop: $(hash).offset().top
	    }, 800, function(){

	    // Add hash (#) to URL when done scrolling (default click behavior)
	      window.location.hash = hash;
	    });

	  } // End if

	});

    Revealator.effects_padding = '-500';

    var owl = $('.owl-carousel');
   

    owl.children().each( function( index ) {
	    $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
	});

    owl.owlCarousel({
	    center: true,
	    items:4,
	    loop:false,
	    margin:0,
	    nav:true
	});

	$(document).on('click', '.owl-item>div', function() {
	    owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
	});

	owl.on('mousewheel', '.owl-stage', function (e) {
	    if (e.deltaY>0) {
	        owl.trigger('next.owl');
	    } else {
	        owl.trigger('prev.owl');
	    }
	    e.preventDefault();
	});
});