/*global IV, $, window */

// This function overwrites certain integrated video functionality for mobile browsers
(function () {
    "use strict";
    IV.Element.prototype.mobileFallback = function () {
        // Don't bother preloading on activate
        this.activate = function () {
            var src, i, j;

            function formatType(obj) {
                if (obj.type.indexOf("video/") !== 0) {
                    obj.type = "video/" + obj.type;
                }
            }

            if (this.hasOwnProperty("fallback")) {
                src = this.fallback;

                if (Array.isArray(src)) {
                    for (i = 0, j = src.length; i < j; i += 1) {
                        formatType(src[i]);
                    }
                } else if (typeof src === "object") {
                    formatType(src);
                }
                this.video.player.src(src);
            }

            this.addPlayBtn();
            this.container.className += " integrated-video-mobile";
            this.addBtnListeners();

            if (!/\integrated-video-content\b/.test(this.content.className)) {
                this.content.className += " integrated-video-content";
            }

            if (this.trimEnd !== undefined) {
                this.setEndpoint(this.trimEnd);
            }
        };
    };
}());