/*global IV, $, YT, window */
/*jslint browser: true, devel: true */

// html IDs and class names will be hypenated
// javascript functions, properties, variables and methods will be camel cased
//
// Global function required to use the youTube Iframe API
function onYouTubeIframeAPIReady() {
    "use strict";
    console.log("youTube API Iframe is ready");
    IV.YouTubeReady();
}

(function () {
    "use strict";
    // Throw error if IV core script is not included.
    if (IV === undefined) {
        throw ("Error: IV.YouTube is dependent on the integrated video library which is not loaded.");
    }

    // Throw error if jQuery script is not included. $ is the jQuery global object
    if ($ === undefined) {
        throw ("Error: IV.YouTube is dependent on the jQuery library which is not loaded.");
    }

    // This function adds the YouTube Iframe API script to the page. Script added dynamically to avoid race condition with ready event.
    IV.iframeAPI = function () {
        var yt_script = document.createElement('script'),
            firstScriptTag = document.getElementsByTagName('script')[0];

        yt_script.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(yt_script, firstScriptTag);

        // Turn IV.iframeAPI into empty function so script tag is only added once.
        IV.iframeAPI = function () {};
    };

    IV.YouTubeReady = function () {
        var i, j, yt;

        for (i = 0, j = IV.youTubes.length; i < j; i += 1) {
            yt = IV.youTubes[i];
            yt.init();
        }

        IV.ytAPI = true;
    };

    // Wrapper function to standardize video constructor calls
    IV.Video = function (args) {
        return new IV.YouTube({el: args});
    };

    // Hold YouTube objects in an array so they can be referenced when the YT API is ready
    IV.youTubes = [];
    IV.ytAPI = false;

    // youTube constructor function
    IV.YouTube = function(args) {
        var self = this;

        IV.iframeAPI();

        // Make sure that this was called as a constructor function
        if (!(this instanceof IV.YouTube)) {
            return new IV.YouTube(args);
        }
        // don't push until constructor verified
        IV.youTubes.push(this);

        // args.el needs to have a value of a dom object or an ID of a dom object
        if (!args.hasOwnProperty("el")) {
            throw ("Error: IV.YouTube requires an object argument containing an el property. el can be a dom object or the ID of a dom object.");
        }

        // if args.el is a string, assume it's the ID of a dom object
        if (typeof args.el === "string") {
            this.el = IV.get(args.el);

            if (this.el === undefined) {
                throw ("Error: the el property passed to IV.YouTube is not a valid dom ID.");
            }
        } else {
            this.el = args.el;

            if (!this.el.hasOwnProperty("nodeType")) {
                throw ("Error: the el property passed to IV.YouTube is not a valid dom object.");
            }
        }

        // This conditional branch will be filled with dynamic embed code. For now it's empty.
        if (this.el.tagName !== "IFRAME") {
            console.log("Dynamic Youtube Embed Code goes here");
        }

        // Set the state change listener to dispatch events based on current state
        function onStateChange() {
            var playerState = self.player.getPlayerState(),
                playbackTimer;

            // YouTube doesn't have a built in play progress listener
            // So we set up an interval function to mimic one.
            function onPlayback() {
                if (self.player.getPlayerState() === YT.PlayerState.PLAYING) {
                    self.dispatch("playback");
                } else {
                    clearInterval(playbackTimer);
                }
            }

            switch (playerState) {
            case YT.PlayerState.ENDED:
                self.dispatch("end");
                clearInterval(playbackTimer);
                break;
            case YT.PlayerState.PLAYING:
                self.dispatch("play");
                if (self.playbackList !== undefined) {
                    playbackTimer = setInterval(onPlayback, 100);
                }
                break;

            case YT.PlayerState.PAUSED:
                self.dispatch("pause");
                clearInterval(playbackTimer);
                break;

            case YT.PlayerState.BUFFERING:
                self.dispatch("buffering");
                clearInterval(playbackTimer);
                break;

            case YT.PlayerState.CUED:
                self.dispatch("cued");
                clearInterval(playbackTimer);
                break;
            }
        }

        // this is called when this.player fires the ready event
        function onPlayerReady() {
            console.log("onPlayerReady");
            if (self.player.getPlayerState() === YT.PlayerState.CUED) {
                self.mobileDetected = true;
            } else {
                self.mobileDetected = false;
            }
            self.playerReady = true;
            self.dispatch("ready");
        }

        //youTube player initialization
        this.init = function() {
            //player is an instance of YT.player 
            self.player = new YT.Player(self.el, {
                playerVars: {'controls': 0, 'showinfo': 0},
                events: {'onReady': onPlayerReady, 'onStateChange': onStateChange }
            });

            //run init only once
            self.init = function () {};
        };

        if (IV.ytAPI) {
            this.init();
        }

        this.eventListeners = {};
        this.playerReady = false;
    };

    // Mimics the actual Vimeo event triggers.
    IV.YouTube.prototype.dispatch = function (eventName) {
        var fn = this[eventName + "Function"];
        if (fn !== undefined) {
            console.log("dispatch", eventName);
            fn();
        }
    };

    /*------------------ Standardized playback controls and event listeners for youTube ------------------*/
    // Starts playback of video
    IV.YouTube.prototype.play = function () {
        this.player.playVideo();
    };

    // Pauses playback of video
    IV.YouTube.prototype.pause = function () {
        this.player.pauseVideo();
    };

    // returns or sets the current time 
    IV.YouTube.prototype.time = function (arg) {
        var seconds;

        if (arg === undefined) {
            return this.player.getCurrentTime();
        }
        seconds = arg;
        this.player.seekTo(seconds, true);
    };

    // Syntacic sugar to return player to first frame
    IV.YouTube.prototype.rewind = function () {
        this.time(0);
    };

    // returns or sets the playback volume
    IV.YouTube.prototype.volume = function (level) {
    //acts as getter and setter. If is passed with para it as a setter otherwise is a getter
        if (level === undefined) {
            return this.player.getVolume();
        }
        this.player.setVolume(level);
    };

    // mutes audio
    IV.YouTube.prototype.mute = function () {
        this.player.mute();
    };

    // unmutes audio
    IV.YouTube.prototype.unmute = function () {
        this.player.unMute();
    };

    // returns the duration of the video
    IV.YouTube.prototype.duration = function () {
        return this.player.getDuration();
    };

    // List of event listeners with standardized names
    IV.YouTube.prototype.events = {
        "ready": "onReady",
        "play": "play",
        "playback": "playback",
        "pause": "pause",
        "end": "end",
        "loading": "buffering"
    };

    // add an event listener to the YouTube player using the standardized event names
    IV.YouTube.prototype.addEvent = function(eventName, callback) {
        var self = this,
            list,
            fn,
            i,
            j;

        if (!this.events.hasOwnProperty(eventName)) {
            throw ("Error: " + eventName + " is not a supported event for IV.YouTube");
        }

        // if the YouTube ready event has not fired yet and this eventName isn't ready, add a ready event to add the event listener
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
        }
    };

    // Remove an event listener from the froogaloop player
    IV.YouTube.prototype.removeEvent = function(eventName, callback) {
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
                delete this[eventName + "List"];
                delete this[eventName + "Function"];
                delete this.eventListeners[eventName];
            }
        }
    };

    // Run a callback function when the playhead reaches a given time
    IV.YouTube.prototype.at = function (time, callback) {
        var self = this,
            buffer = .250;
        if (typeof callback !== "function") {
            throw ("Error: IV.YouTube.at method requires a numeric time argument and a callback function argument.");
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
    }

    /*------------------ IV.Element prototypes specific to youTube's needs. ------------------*/
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

        function onPlayback() {
            var seconds = self.video.time();
            if (seconds > 0) {
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
        function showWhenReady() {
            var seconds = self.video.time();
            if (parseFloat(seconds) > startPoint) {
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
        if (this.video.duration() === 0) {
            console.log("warning no duration");
            this.video.addEvent("play", function () {
                self.setEndpoint(seconds);
            });
        }
         // fade out early if playback has passed the endpoint set in the trim function
        function endEarly() {
            var seconds = self.video.time();
            if (seconds >= self.endpoint) {
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