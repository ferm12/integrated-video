/*global IV, $, _V_, window */
/*jslint browser: true, devel: true */

(function () {
    "use strict";
    // Throw error if IV core script is not included.
    if (IV === undefined) {
        throw ("Error: IV.Html5 is dependent on the integrated video core library which is not loaded.");
    }

    // Throw error if jQuery script is not included. $ is the jQuery global object
    if ($ === undefined) {
        throw ("Error: IV.Html5 is dependent on the jQuery library which is not loaded.");
    }

	// Object to hold Tranisiton objects to be applied to IV.Element hide and show methods
	IV.transitions = {
		"dissolve": {
			"in": function (callback) {

				var self = this,
		            $container = $(this.container),
		            $video = $(this.video.el),
		            h = this.video.el.getAttribute("height") + "px",
		            w = this.video.el.getAttribute("width") + "px";
				console.log($video);

		        // remove the button listeners while the video is active
		        self.removeBtnListeners();
		        $video.css({
		            "width": w,
		            "height": h
		        });

		        $video.animate({
		            "opacity": 1
		        }, "fast", callback);

		        $(self.content).animate({
		            "opacity": 0
		        }, "fast");
		        $container.addClass("integrated-video-active");
			},
			
			"out": function (callback) {
				var self = this,
		            $video = $(this.video.el),
		            $container = $(this.container);

		        $video.animate({
		            "opacity": 0
		        }, "fast", function () {
		            $video.css({
		                "width": 0,
		                "height": 0
		            });
		            self.addBtnListeners();
		            if (typeof callback === "function") {
		                callback();
		            }
		        });

		        $(self.content).animate({
		            "opacity": 1
		        }, "fast");

		        $container.removeClass("integrated-video-active");
			}
		},
		
		"toggle": {
			"in": function (callback) {
				var self = this,
		            $container = $(this.container),
		            $content = $(this.content),
		            $video = $(this.video.el),
		            h = this.video.el.getAttribute("height") + "px",
		            w = this.video.el.getAttribute("width") + "px",
		            to;
console.log($video);
		        // remove the button listeners while the video is active
		        self.removeBtnListeners();
		        $video.css({
		            "width": w,
		            "height": h,
		            "opacity": 1
		        });

		        if (typeof callback === "function") {
		            callback();
		        }

		        $container.addClass("integrated-video-active");
			},
			
			"out": function (callback) {
				var self = this,
		            $container = $(this.container),
		            $content = $(this.content),
		            $video = $(this.video.el);
				
				$video.css({
		            "width": 0,
		            "height": 0,
		            "opacity": 0
		        });
		
				if (typeof callback === "function") {
		            callback();
		        }
		
				self.addBtnListeners();
				$container.removeClass("integrated-video-active");
			}
		},
		
		"dissolveChildren": {
			
			"in": function (selector, callback) {
				var self = this,
		            $container = $(this.container),
		            $content = $(this.content),
		            $video = $(this.video.el),
					h = this.video.el.getAttribute("height") + "px",
		            w = this.video.el.getAttribute("width") + "px";

                selector = selector || "*";
				if (typeof selector === "function") {
					callback = selector;
					selector = "*"
				}
				
				$video.css({
		            "width": w,
		            "height": h
		        });

		        $video.animate({
		            "opacity": 1
		        }, 400, callback);

				$content.children(selector).animate({
		            "opacity": 0
		        }, 400);
				
				self.removeBtnListeners();
				$container.addClass("integrated-video-active");
			},
			
			"out": function (selector, callback) {
				var self = this,
		            $video = $(this.video.el),
		            $container = $(this.container),
		            $content = $(this.content);

                selector = selector || "*";
				if (typeof selector === "function") {
					callback = selector;
					selector = "*"
				}

		        $video.animate({
		            "opacity": 0
		        }, "fast", function () {
		            $video.css({
		                "width": 0,
		                "height": 0
		            });
		            self.addBtnListeners();
		            if (typeof callback === "function") {
		                callback();
		            }
		        });

				$content.children(selector).animate({
		            "opacity": 1
		        }, 400);
				
		        $container.removeClass("integrated-video-active");
			}
		}
	};
/*
	IV.transvideoLink = {
			Add an invisible link over the Trasvideo logo if it isn't already there 
		addTVLink: function() {
			console.log("add link");
			var $wrapper =  $('#video-wrapper'),
				$link = $('#transvideo-link');
			// return if link already exists
			if ($link.length > 0) {
				return true;
			}
			
			// create link an set attributes
			$link = $("<a/>");
			$link.attr({
				id: "transvideo-link",
				href: "http://transvideo.com",
				target: "_blank"
			});

			$link.css({
				"position": "absolute",
				"bottom": "96px",
				"right": "112px",
				"width": "200px",
				"height": "70px",
				"opacity": 0
			});
			
			$wrapper.append($link);
		},

		removeTVLink: function() {
			var $wrapper =  $('#video-wrapper'),
				$link = $('#transvideo-link');
			// return if link already exists
			if ($link.length > 0) {
				$link.remove();
			}
		},

	
		p:function () {
			console.log('FERMIN playing....');
		}
	
	
	};




	// Runs the videoPlaying method when the video playhead position changes//
	// IV.Element.video.addEvent('playback', IV.transvideoLink.p );
	
	        // videoPlaying: function () {
        //     var video = Video.el.get(0),
        //         currentTime = video.currentTime,
        //         logoTime = video.duration - 4;

        //     if (currentTime >= logoTime) {
        //         Video.addTVLink();
        //     } else {
        //         Video.removeTVLink();
        //     }
        // }
*/



	
}());
