(function ($) {

    var Video = {
        el: $('#video'),
        play: $('#learnmore'),
        play2: $('#learnmore-play'),
        stopButton: $('#stop'),
        iOS: ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false ),
        // The btnTimer property will be used to enable/disable the delayed appearance of the play btn.
        btnTimer: null,
        
        init: function() {
            // Create $wrapper var to point to videoWrapper div
            var $wrapper = $("#video-wrapper");
            // Play video
            if(Video.iOS == true) {
                Video.play.addClass('video-link');
                Video.play2.addClass('video-link');
            }

            Video.play.on('click', function(){
                if(Video.iOS != true) {
                    Video.videoPlay();
                }
            });
            
            Video.play2.on('click', function(){
                if(Video.iOS != true) {
                    Video.videoPlay();
                }
            });
            
            Video.stopButton.on('click', function(){
                    Video.videoStop();
            });
            
            Video.el.on('ended', function(){
                var to = setTimeout(function () { Video.videoStop(); }, 5000);
            });
            /* Runs the videoPause method when the video is paused */
            Video.el.on('pause', function(){
                Video.videoPause();
            });
            
            /* Add mouse events to the videoWrapper div so it will show and hide the stop button accordingly. */
            $wrapper.on('mouseenter', function(){
                Video.showControls();
            });
            
            $wrapper.on('mouseleave', function(){
                Video.hideControls();
            });
            
            /* Start the timer that makes the play button appear */
            Video.enableBtnTimer();
        },
        
        videoPlay: function() {
            var transition = setTimeout(function(){
                $('.header-grey').addClass('fma');
                Video.el.fadeIn(150).get(0).play();
                /* Stop the timer that makes the play button appear */
                Video.disableBtnTimer();
                }, 500
            );
            /* Disable appearance of stop button since that's now triggered by mouse events */
            //Video.stopButton.delay(2000).fadeIn(600);
            Video.toggleFMA('hide');
        },

        videoStop: function() {
            $('.header-grey').removeClass('fma');
            /* Start the timer that makes the play button appear */
            Video.enableBtnTimer();
            /* Disable hiding of stop button since that's now triggered by mouse events */
            //Video.stopButton.delay(150).hide();
            Video.el.fadeOut(150);
            Video.el.get(0).pause();
            Video.toggleFMA('show');
            Video.el.get(0).currentTime = 0;            
        },

        /* This method runs the videoReset method after being paused for 10 seconds. */
        videoPause: function () {
            var to = setTimeout(function () {
                Video.videoReset();
            }, 10000);
            
            function clear() {
                clearTimeout(to);
                Video.el.off('play', clear);
            }
            Video.el.on('play', clear);
        },

        /* Hide the video and return playhead to start */
        videoReset: function () {
            Video.videoStop();
            Video.el.get(0).currentTime = 0;
        },

        toggleFMA: function(toggle) {
            $('.flexslider, .flex-home')
                .removeClass('bounceOutLeft bounceInRight')
                .addClass('animated ' + (toggle == 'hide' ? 'bounceOutLeft' : 'bounceInRight'))
        },
        
        /* Make stop button visible */
        showControls: function () {
            Video.stopButton.fadeIn(600);
        },
        
        /* Make stop button invisible */
        hideControls: function () {
            Video.stopButton.fadeOut(600);
        },
        
        /* make the play button appear after 10 seconds */
        enableBtnTimer: function () {
            var $playBtn = $("#learnmore-play");

            Video.btnTimer = setTimeout(function () {
                $playBtn.addClass("show-it");
            }, 10000);
        },
        
        /* cancer timer set in enableBtnTimer method */
        disableBtnTimer: function () {
            var $playBtn = $("#learnmore-play");
            $playBtn.removeClass("show-it");
            clearTimeout(Video.btnTimer);
        }
    }

    var App = {
        init: function () {
            this.blockquote();
            $('a.top').on('click', function () {
                    $.smoothScroll({
                            scrollTarget: '#top'
                        });
                    return false;
                });
            $('a.next').on('click', function () {
                    var num = $(this).data('num');
                    $.smoothScroll({
                            scrollTarget: '#section_' + (num + 1)
                        });
                    return false;
                });
          $('ul.selectors li:first-of-type a').addClass('active');
          
          $('ul.selectors li a').on('click', function(e){
              e.preventDefault();
              var $parent = $(this).parents('ul.selectors');
              $parent.find('a.active').removeClass('active');
              var index = $('li', $parent).index($(this).parent('li'));
              $(this).addClass('active').parents('article.staggered').find('.flexslider').flexslider(index);
          });
          
          $('#menu-item-37').leanModal();
          
          $(".page:not(.home) .flexslider")
            .flexslider({
              animation: "slide",
              slideshow: false,
              animationLoop: false,
              useCSS: false
          });
          
          $(".home .flexslider")
            .flexslider({
              animation: "fade",
              slideshow: true,
              animationLoop: true,
              useCSS: false
          });
          
          $('.flex-control-nav li a').on('click', function(){
              $('.flex-active').removeClass('animated bounce');
              $(this).addClass('animated bounce');
          });
            
        },
        blockquote: function () {
            $('blockquote').each(function () {
                    $(this).prepend('<i class="quote"></i>');
                });
        }
    },

    ContactForm = {
        $form: $("#ContactForm"),

        init: function () {
            if (ContactForm.$form.length) {
                this.hideFields();
            }
        },

        hideFields: function () {
            var $checkbox = ContactForm.$form.find(".checkbox"),
                isDemo = $("body").hasClass("demo");

            if (isDemo) {
                $checkbox.hide();
            }
        }
    },

    VideoOverlays = {
        init: function () {
                     $(".iframe-wrap").each( function () {
                             //$(this).find('iframe').html('');
                     });
           $(".video-link").click(function (e) {
              var overlay = $(this).data("video-id"),
                  $overlay = $("#video-overlay-" + overlay),
                  top = Math.max(0, (($(window).height() - $overlay.outerHeight()) / 2) + $(window).scrollTop()) + "px";

              e.preventDefault();

              $overlay.css("top", top);
                            $("#video-overlay-" + overlay).find('.iframe-wrap').html('<iframe allowFullScreen allowTransparency="true" class="vzaar-video-player" frameborder="0" height="432" id="vzvd-' + overlay + '" mozallowfullscreen name="vzvd-' + overlay + '" src="http://view.vzaar.com/' + overlay + '/player?autoplay=true" title="vzaar video player" type="text/html" webkitAllowFullScreen width="768"></iframe>');
              $("#video-overlay-" + overlay + ", #video-underlay")
                                .appendTo("body").fadeIn("fast");
                                
            });

            $(".close-overlay-link").click(function (e) {
              var $overlay = $(this).parent();
              var $iframeWrap = $overlay.find(".iframe-wrap");
                            $(this).find(".iframe-wrap").html('');

              e.preventDefault();

              $overlay.fadeOut("fast");
              $("#video-underlay").fadeOut("fast");
              $iframeWrap.html($iframeWrap.html());
            });
        }
    };

    App.init();
    ContactForm.init();
    VideoOverlays.init();
    Video.init();

})(jQuery);