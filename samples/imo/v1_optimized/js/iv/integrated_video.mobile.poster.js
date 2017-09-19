/*global IV, $, window */

// This function overwrites certain integrated video functionality for mobile browsers
(function () {
    "use strict";
    IV.Element.prototype.mobileFallback = function () {
        // Don't bother preloading on activate
        this.activate = function () {
            var $container = $(this.container);
            $container.addClass("integrated-video-mobile-poster");
            $container.removeClass("integrated-video-container");

            if (!/\bintegrated-video-content\b/.test(this.content.className)) {
                this.content.className += " integrated-video-content";
            }

            if (this.hasOwnProperty("fallback")) {
                this[this.fallback]();
            }
        };
    };

    IV.Element.prototype.hideContent = function () {
        this.content.style.display = "none";
    };
}());