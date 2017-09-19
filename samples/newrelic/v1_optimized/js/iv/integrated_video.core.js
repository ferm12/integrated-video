/*global window */
/*jslint browser: true, devel: true */

// Set the global var IV to use as a modular namespace for all integrated video functionality
var IV = IV || {};

(function () {
    "use strict";
    // Add basic utility functions to IV namespace

    // Add isArray method to older browsers
    if (!Array.isArray) {
        Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
        };
    }

    // Syntactic sugar to grab dom object by id
    IV.get = function (id) {
        return document.getElementById(id);
    };

    // Returns true or false if the argument is a D.O.M node
    IV.isDOM = function (obj) {
        //if (obj.hasOwnProperty("nodeType")) {
        if (obj.nodeType !== undefined) {
            return true;
        }
        return false;
    };

    // Function to return a new object that combines the properties of all the objects passed as arguments
    IV.mix = function () {
        var arg, prop, child = {};
        for (arg = 0; arg < arguments.length; arg += 1) {
            for (prop in arguments[arg]) {
                if (arguments[arg].hasOwnProperty(prop)) {
                    child[prop] = arguments[arg][prop];
                }
            }
        }
        return child;
    };

    // Takes a list of dependencies and returns a function that runs any functions passed as arguments
    // once all the dependencies evaluate as true
    IV.ready = function () {
        var que = [],
            args = Array.prototype.slice.call(arguments),
            dependencies = (args[0] instanceof Array) ? args[0] : args,

            // checks all dependencies and removes them once they are true.
            // If there are no dependencies left, returns true
            loaded = function () {
                var needsLoading = dependencies.slice(0),
                    condition,
                    i,
                    j;

                for (i = 0, j = needsLoading.length; i < j; i += 1) {

                    if (needsLoading[i].hasOwnProperty("ready")) {
                        condition = needsLoading[i].ready;
                    } else {
                        condition = needsLoading[i];
                    }

                    if ((typeof condition === "function" && condition() === true) || condition === true) {
                        dependencies.splice(i, 1);
                    }
                }
                return dependencies.length === 0;
            },

            // runs all qued functions
            runQue = function () {
                var ran = que.slice(0),
                    i,
                    j = que.length;

                for (i = 0; i < j; i += 1) {
                    que[i]();
                    ran.splice(0, 1);
                }
                que = ran;
            },
            // Runs loaded function every 50 milliseconds
            TO  = setInterval(function () {
                if (loaded()) {
                    runQue();
                    clearInterval(TO);
                }
            }, 50);
        // Returns function that ques up any functions passed to it
        return function () {
            var fns = Array.prototype.slice.call(arguments),
                prepped = loaded(),
                i,
                j = fns.length;

            if (j === 0) {
                return prepped;
            }

            for (i = 0; i < j; i += 1) {
                if (typeof fns[i] === "function") {
                    if (prepped) {
                        fns[i]();
                    } else {
                        que.push(fns[i]);
                    }
                }
            }
        };
    };

    // End Utility functions

    // IV.Element is the core IV constructor function.
    // The args parameter requires an object with a container property, a content property, and a video property.
    // The container and content will be a dom object or ID. The video could be a dom object, an object literal, 
    // or a video id string depending on the specific implementation.
    IV.Element = function (args) {
        var self = this,
            container,
            content,
            video,
			transition,
            preload;

        if (args === undefined) {
            throw ("Error: IV.Element() requires an object with container, content, and video properties as an argument.");
        }

        // Make sure that IV.Element was called as a constructor function
        if (!(this instanceof IV.Element)) {
            return new IV.Element(args);
        }

        // Make sure the args argument has all the necessary properties
        // Validate container
        if (!args.hasOwnProperty("container")) {
            throw ("Error: Include a container property in the argument for IV.Element.");
        }
        container = args.container;
        container = IV.isDOM(container) ? container : IV.get(container);

        if (!/\biv-container\b/.test(container.className)) {
            container.className += " iv-container";
        }

        if (!IV.isDOM(container)) {
            throw ("Error: " + args.container + " is not a valid D.O.M element.");
        }
        // Validate content
        if (!args.hasOwnProperty("content")) {
            throw ("Error: Include a content property in the argument for IV.Element.");
        }
        content = args.content;
        content = IV.isDOM(content) ? content : IV.get(content);
        if (!IV.isDOM(content)) {
            throw ("Error: " + args.content + " is not a valid D.O.M element.");
        }

        // Check for video
        if (!args.hasOwnProperty("video")) {
            throw ("Error: Include a video property in the argument for IV.Element.");
        }
        // validation of video will be done in the IV.Video constructor function
        video = new IV.Video(args.video);

        // set instance properties
        this.container = container;
        this.content = content;
        this.video = video;

        // Set behavioral properties

        if (args.preload !== undefined) {
            preload = args.preload === false ? false : true;
        } else {
            preload = true;
        }

        // reset behavior

		// override default transitions
		if (args.hasOwnProperty("transition")) {
			transition = args.transition;
			
			if (typeof transition === "string" && IV.transitions.hasOwnProperty(transition)) {
				this.show = function (callback) {
					IV.transitions[transition].in.call(self, callback);
				};

				this.hide = function (callback) {
					IV.transitions[transition].out.call(self, callback);
				};
			}
		}

		if (args.hasOwnProperty("show")) {
			if (typeof args.show === "string" && IV.transitions.hasOwnProperty(args.show)) {
				this.show = function (callback) {
					IV.transitions[args.show].in.call(self, callback);
				};
			} else if (typeof args.show === "function") {
				this.show = function (callback) {
					args.show.call(self, callback);
				};
			}
		}

		if (args.hasOwnProperty("hide")) {
			if (typeof args.hide === "string" && IV.transitions.hasOwnProperty(args.hide)) {
				this.hide = function (callback) {
					IV.transitions[args.hide].out.call(self, callback);
				};
			} else if (typeof args.hide === "function") {
				this.hide = function (callback) {
					args.hide.call(self, callback);
				};
			}
		}

        if (args.pauseReset !== undefined) {
            this.pauseReset = args.pauseReset === true || args.pauseReset === "no-rewind" ? true : false;
            if (args.pauseReset === "no-rewind") {
                this.resetRewind = false;
            } else {
                this.resetRewind = true;
            }
        } else {
            this.pauseReset = true;
            this.resetRewind = true;
        }

        // start and end point adjustment
        if (args.trimStart !== undefined) {
            this.trimStart = args.trimStart;
        }

        if (args.trimEnd !== undefined) {
            this.trimEnd = args.trimEnd;
        }

        this.ready = IV.ready(function () {
            return self.video.mobileDetected !== undefined;
        });

        // instance specific mobile fallback override
        // start and end point adjustment
        if (args.fallback !== undefined) {
            this.fallback = args.fallback;
        }

        // The instance ready method will be determined based on the type of video
        this.ready(function () {
            if (self.video.mobileDetected) {
                preload = false;
                self.mobileFallback();
            }

            if (preload) {
                self.preload(function () {
                    self.activate();
                });
            } else {
                self.activate();
            }
        });
    };
}());
