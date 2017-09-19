/*global IV, $, window */

// This function overwrites certain integrated video functionality for mobile browsers
(function () {
    "use strict";
    IV.Element.prototype.mobileFallback = function () {
        // Don't bother preloading on activate
        this.activate = function () {
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