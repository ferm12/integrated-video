/*global IV, $, window */

// This function overwrites certain integrated video functionality for mobile browsers
(function () {
    "use strict";
    IV.loadHtmlDependencies = function () {
        console.log("loadHtmlDependencies called");
        var scripts = document.getElementsByTagName("script"),
            firstScriptTag = scripts[0],
            path,
            i,
            j,
            src,
            tag,
            html5JS = "integrated_video.html5.js",
            videoJS = "player_apis/video-js/video.min.js",
            videoCSS = "player_apis/video-js/video-js.css";

        for (i = 0, j = scripts.length; i < j; i += 1) {
            src = scripts[i].getAttribute("src");
            if (src.indexOf("integrated_video") !== -1) {
                path = src.substr(0, src.lastIndexOf("/")) + "/";
                break;
            }
        }

        if (path === undefined) {
            throw ("Error: path to Integrated Videos folder could not be determinded.");
        }

        tag = document.createElement("link");
        tag.setAttribute("rel", "stylesheet");
        tag.setAttribute("type", "text/css/");
        tag.setAttribute("href", path + videoCSS);
        document.getElementsByTagName("head")[0].appendChild(tag);

        tag = document.createElement("script");
        tag.setAttribute("src", path + videoJS);
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        tag = document.createElement("script");
        tag.setAttribute("src", path + html5JS);
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        IV.loadHtmlDependencies = function () {};
    };

    IV.Element.prototype.mobileFallback = function () {
        var self = this;
        console.log("mobile fallback called.");

        // Don't bother preloading on activate
        this.activate = function () {
            console.log("mobile fallback activated.");
            var ready,
                video,
                vWidth = this.video.el.getAttribute("width"),
                vHeight = this.video.el.getAttribute("height"),
                eventListeners = this.video.eventListeners;

            this.removeBtnListeners();
            this.container.removeChild(this.video.el);
            this.container.className += " integrated-video-mobile";

            IV.loadHtmlDependencies();

            ready = IV.ready(function () {
                console.log("test ready");
                if (IV.Html5 === undefined && !window.hasOwnProperty("_V_")) {
                    return false;
                }
                return true;
            });

            ready(function () {
                var videoReady;

                if (self.hasOwnProperty("fallback")) {
                    console.log("yeah fallback");
                    video = IV.Html5.prototype.constructVideo({
                        el: self.fallback,
                        width: vWidth,
                        height: vHeight
                    });
                    self.container.appendChild(video);
                    self.video = new IV.Html5({el: video});
                    videoReady = IV.ready(function () {
                        return self.video.mobileDetected !== undefined;
                    });

                    videoReady(function () {
                        var eventName, listener, fn, list, i, j;

                        for (eventName in eventListeners) {
                            if (eventListeners.hasOwnProperty(eventName)) {
                                listener = eventListeners[eventName];
                                fn = listener.fn;
                                list = listener.list;

                                for (i = 0, j = list.length; i < j; i += 1) {
                                    self.video.addEvent(eventName, list[i]);
                                }
                            }
                        }

                        IV.Element.prototype.activate.call(self);
                    });
                } else {
                    console.log("no fallback");
                    delete self.video;
                }
            });

            /*var $container = $(this.container),
                fallback;
            $container.addClass("integrated-video-mobile-poster");
            $container.removeClass("integrated-video-container");

            if(!/\bintegrated-video-content\b/.test(this.content.className)) {
                this.content.className += " integrated-video-content";
            }

            if (this.hasOwnProperty("fallback")) {
                this[this.fallback]();
            }*/
        };
    };
}());