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

    // Throw error if videojs script is not included. _V_ is the videojs global object
    // if (!window.hasOwnProperty("_V_")) {
    //     throw ("Error: IV.Html5 is dependent on the videojs library which is not loaded.");
    // }

    // Wrapper function to standardize video constructor calls
    IV.Video = function (args) {
        if (args === undefined) {
            throw ("Error: no argument passed to IV.Video");
        }
        return new IV.Html5({el: args});
    };

    // Vimeo constructor function
    IV.Html5 = function(args) {
		var is_chrome = /chrome/.test(navigator.userAgent.toLowerCase());
		var iOS = /(ipad|iphone|ipod)/g.test( navigator.userAgent.toLowerCase() );
		
		if (is_chrome || iOS){
			$('#imo_img img').css({'display':'block'});
			if (iOS){ $('#imo_img img').css({'z-index':-1});}
		}else{
			$('#imo_img img').css({'display':'none'});
		}
        var self = this,
            vID,

            // attempts to start playing the video. If it can't a mobile device is assumed
            preload = function () {
                function onPlayback() {
                    if (self.time() > 0) {
                        console.log("Preload ready");
                        self.removeEvent("playback", onPlayback);
                        self.pause();
                        self.rewind();
                        self.unmute();
                    }
                }

                self.mute();
                self.play();


						//by fermin
				//switches png placeholde with video's first frame when video ready
				if (is_chrome) {
					var $video = $('#iv-video'),
						h = $video.attr("height") + "px",
						w = $video.attr("width") + "px";

					$video.css({
						"width": w,
						"height": h
					});

					$video.animate({
						"opacity": 1
					},{
						'duration':2000,
						'queue':false
					});

					$('#imo_img img').animate({
						'opacity':0
					},{
						'duration':2000,
						'queue':false,
						'complete':function () {
							var that = this;
							setTimeout(function () {
								$(that).css({'display':'none'});
							},5000);
						}
					});	
				}



                if (self.player.paused()) {
                    self.unmute();
                    self.mobileDetected = true;
                    return;
                }
                self.mobileDetected = false;
                self.addEvent("playback", onPlayback);
            },
            // Initialization function. run once the froogaloop player is ready
            init = function() {
                // Reset the el property because video js wraps a div around the video element
                self.el = self.player.el;
                self.playerReady = true;
                self.dispatch("ready");
                // default to false
                preload();
            };
        // Make sure that this was called as a constructor function
        if (!(this instanceof IV.Html5)) {
            return new IV.Html5(args);
        }

        // args.el needs to have a value of a dom object or an ID of a dom object
        if (!args.hasOwnProperty("el") || args.el === undefined) {
            throw ("Error: IV.Html5 requires an object argument containing an el property. el can be a dom object or the ID of a dom object.");
        }

        // if args.el is a string, assume it's the ID of a dom object
        if (typeof args.el === "string") {
            this.el = IV.get(args.el);

            if (this.el === undefined) {
                throw ("Error: the el property passed to IV.Html5 is not a valid dom ID.");
            }
        } else {
            this.el = args.el;

            if (!this.el.hasOwnProperty("nodeType")) {
                if (Array.isArray(this.el)) {
                    this.el = this.constructVideo(args);
                } else {
                    throw ("Error: the el property passed to IV.Html5 is not a valid dom object.");
                }
            }
        }

        // This conditional branch will be filled with dynamic embed code. For now it's empty.
        if (this.el.tagName !== "VIDEO") {
            console.log("Dynamic Html5 Embed Code goes here");
        }
        // Grab the ID of the video tag because it will be reassigned to a wrapper div by videojs
        vID = this.el.getAttribute("id");

        $(this.el).addClass("integrated-video video-js vjs-quicktime-skin");

        // Create a player property with a videojs instance
        this.eventListeners = {};
        this.playerReady = false;
        this.player = _V_(this.el);

		if(is_chrome){
			var timestamp = new Date().getTime();	
			this.player.src("videos/imo_overview.mp4?i="+timestamp);
		}
        this.player.ready(init);
    };

    /*------------------ Standardized playback controls and event listeners for Vimeo ------------------*/
    // Starts playback of video
    IV.Html5.prototype.play = function () {
        this.player.play();
    };

    // Pauses playback of video
    IV.Html5.prototype.pause = function () {
        this.player.pause();
    };

    // returns or sets the current time 
    IV.Html5.prototype.time = function (seconds) {
        if (seconds === undefined) {
            return this.player.currentTime();
        }
        this.player.currentTime(seconds);
    };

    // Syntacic sugar to return player to first frame
    IV.Html5.prototype.rewind = function () {
        this.time(0);
    };

    // returns or sets the playback volume
    IV.Html5.prototype.volume = function (level) {
        if (level === undefined) {
            return this.player.volume();
        }
        this.player.volume(level);
    };

    // mutes audio
    IV.Html5.prototype.mute = function () {
        this.previousVolume = this.volume();
        this.volume(0);
        this.muted = true;
    };

    // unmutes audio
    IV.Html5.prototype.unmute = function () {
        if (this.muted) {
            this.volume(this.previousVolume);
            this.muted = false;
        }
    };

    // returns the duration of the video
    IV.Html5.prototype.duration = function () {
        return this.player.duration();
    };

    // List of event listeners with standardized names
    IV.Html5.prototype.events = {
        "play": "play",
        "playback": "timeupdate",
        "pause": "pause",
        "end": "ended",
        "loading": "progress",
        "volume": "volumechange"
    };

    // add an event listener to the froogaloop player using the standardized event names
    IV.Html5.prototype.addEvent = function(eventName, callback) {
        var self = this,
            list,
            fn,
            i,
            j;
        if (!this.events.hasOwnProperty(eventName) && eventName !== "ready") {
            throw ("Error: " + eventName + " is not a supported event for IV.Html5");
        }

        // if the video ready event hs not fired yet and this eventName isn't ready, add a ready event to add the event listener
        if (!this.playerReady && eventName !== "ready") {
            this.addEvent('ready', function () {
                self.addEvent(eventName, callback);
            });
            return;
        }

        // setup an array of functions to run on the event so multiple calls can be made to addEvent 
        // for a specific event without overwriting functionality.

        if (this.hasOwnProperty(eventName + "List")) {
            list = this[eventName + "List"];

            // check to makesure callback is not already in list
            for (i = 0, j = list.length; i < j; i += 1) {
                if (list[i] === callback) {
                    console.log(eventName, "already has this callback");
                    return;
                }
            }
            list.push(callback);
        } else {
            list = [callback];
            fn = function () {
                // clone the list array so the elements are not affected during the loop
                var list = self[eventName + "List"].slice(0);

                for (i = 0, j = list.length; i < j; i += 1) {
                    list[i].apply(this, arguments);
                }
            };
            this[eventName + "List"] = list;
            this[eventName + "Function"] = fn;
            this.eventListeners[eventName] = {
                list: list,
                fn: fn
            };
            if (eventName !== "ready") {
                this.player.addEvent(this.events[eventName], fn);
            }
        }
    };

    // Remove an event listener from the froogaloop player
    IV.Html5.prototype.removeEvent = function(eventName, callback) {
        var list,
            i,
            j;
        if (!this.events.hasOwnProperty(eventName) && eventName !== "ready") {
            throw ("Error: " + eventName + " is not a supported event for IV.Html5");
        }

        // remove the callback from the event function array
        if (this.hasOwnProperty(eventName + "List")) {
            list = this[eventName + "List"];
            for (i = 0, j = list.length; i < j; i += 1) {
                if (list[i] === callback) {
                    list.splice(i, 1);
                    break;
                }
            }
            // if the array is empty remove the listener and delete the function list and callback loop function
            if (list.length === 0) {
                if (eventName !== "ready") {
                    this.player.removeEvent(this.events[eventName], this[eventName + "Function"]);
                }
                delete this[eventName + "List"];
                delete this[eventName + "Function"];
                delete this.eventListeners[eventName];
            }
        }
    };

    // Mimics the actual Vimeo event triggers.
    IV.Html5.prototype.dispatch = function (eventName) {
        var fn = this[eventName + "Function"];
        if (fn !== undefined) {
            console.log("dispatch", eventName);
            fn();
        }
    };

    // Create a video tag on the fly
    IV.Html5.prototype.constructVideo = function (args) {
        var video = document.createElement("video"),
            width = args.width || 640,
            height = args.height || 360,
            sources = args.el,
            src,
            type,
            tag,
            i,
            j;

        video.setAttribute("width", width);
        video.setAttribute("height", height);
        video.setAttribute("controls", true);

        for (i = 0, j = sources.length; i < j; i += 1) {
            src = sources[i].src;
            type = sources[i].type;
            if (type.indexOf("video/") !== 0) {
                type = "video/" + type;
            }

            tag = document.createElement("source");
            tag.setAttribute("src", src);
            tag.setAttribute("type", type);
            video.appendChild(tag);
        }

        return video;
    };

    // Run a callback function when the playhead reaches a given time
    IV.Html5.prototype.at = function (time, callback) {
        var self = this,
            buffer = .100;
        if (typeof callback !== "function") {
            throw ("Error: IV.Html5.at method requires a numeric time argument and a callback function argument.");
        }
        time = parseFloat(time);
        
        function checkTime() {
            var currentTime = self.time();
            // add a bit of time buffer to the conditional because exact video time might never trigger.
            if (currentTime >= (time - buffer) && currentTime <= (time + buffer)) {
                self.removeEvent("playback", checkTime);
                callback();
            }
        }
        self.addEvent("playback", checkTime);
    };

    /*------------------ IV.Element prototypes specific to Vimeo's needs. ------------------*/
    // Run once the Element is ready.
    // preload isn't needed here because it's attempted as soon as the player is ready to determine mobile status
    IV.Element.prototype.activate = function () {
        var self = this;
        self.addPlayBtn();
        self.addBtnListeners();

        if (!/\integrated-video-content\b/.test(self.content.className)) {
            self.content.className += " integrated-video-content";
        }

        if (self.trimEnd !== undefined) {
            self.setEndpoint(self.trimEnd);
        }
    };

    // starts playing the video for a second to get it loading
    IV.Element.prototype.preload = function (callback) {
        var self = this;

        /*function onPlayback() {
            if (self.video.time() > 0) {
                console.log("Preload ready");
                self.video.removeEvent("playback", onPlayback);
                self.video.pause();
                self.video.rewind();
                self.video.unmute();
                if (callback && typeof callback === "function") {
                    callback();
                }
            }
        }

        self.video.mute();
        self.video.play();
        self.video.addEvent("playback", onPlayback);*/
        
        if (callback && typeof callback === "function") {
            callback();
        }
    };

    // Adds a play button to the container
    IV.Element.prototype.addPlayBtn = function () {
        var $btn, $container, x, y, btnH, btnW, timer;

        if (this.hasOwnProperty("$playBtn")) {
            return true;
        }

        $container = $(this.container);

        // use a span instead of an image so that the src can be set as a css background property 
        // and the relative path will not need to be known beforehand
        $btn = $("<span/>");
        $btn.addClass("integrated-video-play-btn");

        $container.append($btn);

        timer = setTimeout(function () {
            $container.addClass("integrated-video-highlight");
        }, 3000);

        btnH = parseFloat($btn.css("height"));
        btnW = parseFloat($btn.css("width"));
        
        // Calculate the center points on the x and y axis based on the container dimesions and the dimensions of the button
        x = ((($container.width() + parseInt($container.css("padding-left"), 10) + parseInt($container.css("padding-right"), 10)) - btnW) / 2);
        y = ((($container.height() + parseInt($container.css("padding-top"), 10) + parseInt($container.css("padding-bottom"), 10)) - btnH) / 2);

		//by fermin
        // $btn.css({
        //     "top": y + "px",
        //     "left": x + "px"
        // });
		$btn.css({
			'top': '148px',
			'left': '359px'
		});

        // add $playBtn ass a property to this instance so it is only added once
        this.$playBtn = $btn;
    };

    // The container element is treated as the play button by default unless another object is passed as an argument
    IV.Element.prototype.addBtnListeners = function () {
        var self = this,
            btn = this.btn || this.container,
            $btn = $(btn);
        function start() {
            self.start();
        }
        $btn.on("click", start);
        btn.btnListeners = [{e: "click", fn: start}];
    };

    // The disables play button behavior of the container or obj
    IV.Element.prototype.removeBtnListeners = function () {
        var btn = this.btn || this.container,
            $btn = $(btn),
            listener;

        if (btn.btnListeners !== undefined) {
            // loop through the listeners added and disable them then remove them from the btnListeners array
            while (btn.btnListeners.length > 0) {
                listener = btn.btnListeners[0];
                $btn.off(listener.e, listener.fn);
                btn.btnListeners.splice(0, 1);
            }
        }
    };

    IV.Element.prototype.changeBtn = function (obj) {
        this.removeBtnListeners();
        this.btn = obj;
        this.addBtnListeners();
    };

    // The start method plays the video and fades it up once the black screen has passed
    IV.Element.prototype.start = function (callback) {
        var self = this,
            startPoint = this.trimStart || 0.5,
            // startPoint = 0.05,
            pauseTO,
            $container = $(this.container),
            $loading = $("<span class='integrated-video-loading' />");

         $container.append($loading);

        // when playback is past the half second mark (rough guage of when the black frame is gone), make the video visible
        function showWhenReady() {
            if (self.video.time() > startPoint) {
                $loading.remove();
                self.show(callback);
                self.video.removeEvent("playback", showWhenReady);
				$container.removeClass("integrated-video-inactive-controls");
            }
        }

        // Wrap the end call in this function so the proper binding can be added
        function hideWhenDone() {
            console.log("hideWhenDone");
            self.end();
            self.video.removeEvent("end", hideWhenDone);
            self.video.removeEvent("pause", resetWhenPaused);
            self.video.removeEvent("end", disableReset);
			$container.addClass("integrated-video-inactive-controls");
        }

        function resetWhenPaused() {
            console.log("reset called");
            clearTimeout(pauseTO);
            self.video.removeEvent("pause", resetWhenPaused);
            self.video.addEvent("play", disableReset);
            self.video.addEvent("end", disableReset);
            pauseTO = setTimeout(function() {
                console.log("reset run");
                self.hide(function () {
                    if (self.resetRewind) {
                        self.video.rewind();
                    }
                });

                self.video.removeEvent("play", disableReset);
                self.video.removeEvent("end", disableReset);

                clearTimeout(pauseTO);
            }, 5000);
        }

        function disableReset() {
            console.log("reset disable");
            self.video.removeEvent("play", disableReset);
            self.video.removeEvent("end", disableReset);
            self.video.addEvent("pause", resetWhenPaused);
            clearTimeout(pauseTO);
        }

        this.video.play();
        this.video.addEvent("playback", showWhenReady);
        this.video.addEvent("end", hideWhenDone);

        if (this.pauseReset) {
            this.video.addEvent("pause", resetWhenPaused);
        }
    };

    // This function is called when the video has finished playing
    IV.Element.prototype.end = function () {
        console.log("End method called");
        this.hide();
    };

    // Set the show method as a prototype for now
    // Will eventually add the ability to choose from a variety of transitions on IV.Element instance creation
    IV.Element.prototype.show = function (callback) {

		var iOS = /(ipad|iphone|ipod)/g.test( navigator.userAgent.toLowerCase() );
		

		
        var self = this,
            $container = $(this.container),
            $video = $(this.video.el),
            h = this.video.el.getAttribute("height") + "px",
            w = this.video.el.getAttribute("width") + "px",
            to;

        // remove the button listeners while the video is active
        self.removeBtnListeners();



        $video.css({
            "width": w,
            "height": h
        });

		if (iOS){


			$video.animate({
				"opacity": 1
			},{
				'duration':100,
				'queue':false
			});


			$('#imo_img img').animate({
				'opacity':0
			},{
				'duration':200,
				'queue':false,
				'complete':function () {
					$(this).css({'display':'none'});
				}
			});	

		}	

		$('#splash_features').delay(1000).animate({
			"opacity": 0
		 }, 'fast');

	
		if (iOS) {
			$('#text').delay(2000).animate({
				'opacity': 0
			},{
				'duration':'fast',
				'complete':function () {
					$(this).css({'display':'none'});
				}
			});	
		}else{
			$('#text').delay(2000).animate({
				'opacity': 0
			}, 'fast');
		}	



        $container.addClass("integrated-video-active");
		
		//removes vjs-controls
		$('.vjs-controls').removeClass('vjs-fade-in');

        // to = setTimeout(function() {
		
			// $('.vjs-controls').removeClass('vjs-fade-out');	
			// $('.vjs-controls').addClass('vjs-fade-in');

        // }, 3000);

		/*by fermin START*/
		/* show vjs-controls for 3 seconds and them hides them*/
	 	// to = setTimeout(function() {
// 
            // if ($('.vjs-controls').hasClass('vjs-fade-in')){
				// $('.vjs-controls').removeClass('vjs-fade-in');
				// $('.vjs-controls').addClass('vjs-fade-out');
			// }
			
        // }, 6000);
	
		/*by fermin END*/
		to = setTimeout(function() {
            $(".vjs-controls").css({
                "display": "inherit"
            });
        }, 2000);

		
    };

    // Set the hide method as a prototype for now
    // Will eventually add the ability to choose from a variety of transitions on IV.Element instance creation
    IV.Element.prototype.hide = function (callback) {
		var iOS = /(ipad|iphone|ipod)/g.test( navigator.userAgent.toLowerCase() );
		
        var self = this,
            $video = $(this.video.el),
            $container = $(this.container);

		if (iOS) {

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

			$('#imo_img img').css({'display':'block','opacity':1});
		}else{

			self.addBtnListeners();
			if (typeof callback === "function") {
				callback();
			}
		}

        $('#splash_features').animate({
            "opacity": 1
        }, 'fast');

		$('#text').css({
			'opacity': 1,
			'display':'block'
		});

        $(".vjs-controls").css({
            "display": "none"
        });
        $container.removeClass("integrated-video-active");
    };

    // Sets the enpoint property to a given number of seconds prior to the video length
    IV.Element.prototype.setEndpoint = function (seconds) {
        var self = this;
        seconds = seconds || 1;
        this.endpoint = this.video.duration() - seconds;

         // fade out early if playback has passed the endpoint set in the trim function
        function endEarly(data) {
            if (data.seconds >= self.endpoint) {
                console.log("end early");
                self.hide(function () {
                    self.video.pause();
                    self.video.rewind();
                    self.video.dispatch("end");
                });
            }
        }
        this.video.addEvent("playback", endEarly);
    };
}());
