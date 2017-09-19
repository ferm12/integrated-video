/*global IV, $, $f, window */
/*jslint browser: true, devel: true */

(function () {
    "use strict";
    // Throw error if IV core script is not included.
    if (IV === undefined) {
        throw ("Error: IV.Vimeo is dependent on the froogaloop library which is not loaded.");
    }

    // Throw error if jQuery script is not included. $ is the jQuery global object
    if ($ === undefined) {
        throw ("Error: IV.Vimeo is dependent on the jQuery library which is not loaded.");
    }

    // Throw error if froogaloop script is not included. $f is the froogaloop global object
    if ($f === undefined) {
        throw ("Error: IV.Vimeo is dependent on the froogaloop library which is not loaded.");
    }

    // Wrapper function to standardize video constructor calls
    IV.Video = function (args) {
        return new IV.Vimeo({el: args});
    };

    // Vimeo constructor function
    IV.Vimeo = function(args) {
        var self = this,
            volume,
            duration,

            // Initialization function. run once the froogaloop player is ready
            init = function() {
                self.playerReady = true;
                // cache the player's initial volume
                self.player.api("getVolume", function (level) {
                    volume = level;
                    self.mobileDetected = volume === null;
                });

                // cache the video's duration
                self.player.api("getDuration", function (level) {
                    duration = level;
                });
            };
        // Make sure that this was called as a constructor function
        if (!(this instanceof IV.Vimeo)) {
            return new IV.Vimeo(args);
        }

        // args.el needs to have a value of a dom object or an ID of a dom object
        if (!args.hasOwnProperty("el")) {
            throw ("Error: IV.Vimeo requires an object argument containing an el property. el can be a dom object or the ID of a dom object.");
        }

        // if args.el is a string, assume it's the ID of a dom object
        if (typeof args.el === "string") {
            this.el = IV.get(args.el);

            if (this.el === undefined) {
                throw ("Error: the el property passed to IV.Vimeo is not a valid dom ID.");
            }
        } else {
            this.el = args.el;

            if (!IV.isDOM(this.el)) {
                throw ("Error: the el property passed to IV.Vimeo is not a valid dom object.");
            }
        }

        // This conditional branch will be filled with dynamic embed code. For now it's empty.
        if (this.el.tagName !== "IFRAME") {
            console.log("Dynamic Vimeo Embed Code goes here");
        }

        if (!/\bintegrated-video\b/.test(this.el.className)) {
            if (this.el.className === "") {
                this.el.className += "integrated-video";
            } else {
                this.el.className += " integrated-video";
            }
        }

        // Returns the cached volume property
        this.getVolume = function () {
            return volume;
        };

        // Set the player volume and cache it in the volume var
        this.setVolume = function (value) {
            this.player.api("setVolume", value);
            volume = value;
        };

        // returns the cached duration
        this.getDuration = function () {
            return duration;
        };

        // Create a player property with a froogaloop instance
        this.eventListeners = {};
        this.playerReady = false;
        this.player = $f(this.el);
        this.addEvent('ready', init);
    };

    /*------------------ Standardized playback controls and event listeners for Vimeo ------------------*/
    // Starts playback of video
    IV.Vimeo.prototype.play = function () {
        this.player.api("play");
    };

    // Pauses playback of video
    IV.Vimeo.prototype.pause = function () {
        this.player.api("pause");
    };

    // returns or sets the current time 
    IV.Vimeo.prototype.time = function (arg) {
        // Vimeo's getCurrentTime function is asynchronous so it must be used with a callback function
        var callback, seconds;

        if (arg === undefined) {
            throw ("Error: IV.Vimeo.time needs a seconds argument to seek to a specific time or a callback function to recieve the curent time");
        }
        // if the argument is a function, retrieve the time
        if (typeof arg === "function") {
            callback = arg;
            this.player.api("getCurrentTime", callback);
            return;
        }
        // otherwise set the time
        seconds = arg;
        this.player.api("seekTo", seconds);
    };

    // Syntacic sugar to return player to first frame
    IV.Vimeo.prototype.rewind = function () {
        this.time(0);
    };

    // returns or sets the playback volume
    IV.Vimeo.prototype.volume = function (level) {
        if (level === undefined) {
            return this.getVolume();
        }
        this.setVolume(level);
    };

    // mutes audio
    IV.Vimeo.prototype.mute = function () {
        this.previousVolume = this.getVolume();
        this.setVolume(0);
        this.muted = true;
    };

    // unmutes audio
    IV.Vimeo.prototype.unmute = function () {
        if (this.muted) {
            this.setVolume(this.previousVolume);
            this.muted = false;
        }
    };

    // returns the duration of the video
    IV.Vimeo.prototype.duration = function () {
        return this.getDuration();
    };

    // List of event listeners with standardized names
    IV.Vimeo.prototype.events = {
        "ready": "ready",
        "play": "play",
        "playback": "playProgress",
        "pause": "pause",
        "end": "finish",
        "seek": "seek",
        "loading": "loadProgress"
    };

    // add an event listener to the froogaloop player using the standardized event names
    IV.Vimeo.prototype.addEvent = function(eventName, callback) {
        var self = this,
            list,
            fn,
            i,
            j;

        if (!this.events.hasOwnProperty(eventName)) {
            throw ("Error: " + eventName + " is not a supported event for IV.Vimeo");
        }

        // if the froogaloop ready event hs not fired yet and this eventName isn't ready, add a ready event to add the event listener
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

            this.player.addEvent(this.events[eventName], fn);
            this.eventListeners[eventName] = {
                list: list,
                fn: fn
            };
        }
    };

    // Remove an event listener from the froogaloop player
    IV.Vimeo.prototype.removeEvent = function(eventName, callback) {
        var list,
            i,
            j;

        if (!this.events.hasOwnProperty(eventName)) {
            throw ("Error: " + eventName + " is not a supported event for IV.Vimeo");
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
                this.player.removeEvent(this.events[eventName], this[eventName + "Function"]);
                delete this[eventName + "List"];
                delete this[eventName + "Function"];
                delete this.eventListeners[eventName];
            }
        }
    };

    // Mimics the actual Vimeo event triggers.
    IV.Vimeo.prototype.dispatch = function (eventName) {
        var fn = this[eventName + "Function"];
        if (fn !== undefined) {
            console.log("dispatch", eventName);
            fn();
        }
    };

    // Run a callback function when the playhead reaches a given time
    IV.Vimeo.prototype.at = function (time, callback) {
        var self = this,
            buffer = .250;
        if (typeof callback !== "function") {
            throw ("Error: IV.Vimeo.at method requires a numeric time argument and a callback function argument.");
        }
        
        // set callbacks as a property because vimeo get time function only responds to the most recent invocation's callback
        self.atCallbacks = self.atCallbacks || [];
        
        time = parseFloat(time);
        
        function checkTime(currentTime) {
            if (currentTime >= (time - buffer) && currentTime <= (time + buffer)) {
                callback();
                return true;
            }
            return false;
        }
        
        function loopCallbacks() {
            self.time(function (data) {
                var currentTime = parseFloat(data),
                    callbacks = self.atCallbacks.slice(0),
                    i,
                    j;
                for (i = 0, j = callbacks.length; i < j; i += 1) {
                    if (callbacks[i](currentTime)) {
                        self.atCallbacks.splice(i, 1);
                    }
                }

                if (self.atCallbacks.length === 0) {
                    self.removeEvent("playback", loopCallbacks);
                }
            });
        }

        self.atCallbacks.push(checkTime);
        self.addEvent("playback", loopCallbacks);
    }

    /*------------------ IV.Element prototypes specific to Vimeo's needs. ------------------*/
    // Run once the Element is ready.
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

        function onPlayback(data) {
            if (data.seconds > 0) {
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
        self.video.addEvent("playback", onPlayback);
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

        $btn.css({
            "top": y + "px",
            "left": x + "px"
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
            pauseTO,
            $container = $(this.container),
            $loading = $("<span class='integrated-video-loading' />");

         $container.append($loading);

        // when playback is past the half second mark (rough guage of when the black frame is gone), make the video visible
        function showWhenReady(data) {
            if (parseFloat(data.seconds) > startPoint) {
                $loading.remove();
                self.show(callback);
                self.video.removeEvent("playback", showWhenReady);
            }
        }
        // Wrap the end call in this function so the proper binding can be added
        function hideWhenDone() {
            console.log("hideWhenDone");
            self.end();
            self.video.removeEvent("end", hideWhenDone);
            self.video.removeEvent("pause", resetWhenPaused);
            self.video.removeEvent("end", disableReset);
            self.video.removeEvent("play", disableReset);
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
        var self = this,
            $container = $(this.container),
            $video = $(this.video.el),
            h = this.video.el.getAttribute("height") + "px",
            w = this.video.el.getAttribute("width") + "px";

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
    };

    // Set the hide method as a prototype for now
    // Will eventually add the ability to choose from a variety of transitions on IV.Element instance creation
    IV.Element.prototype.hide = function (callback) {
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