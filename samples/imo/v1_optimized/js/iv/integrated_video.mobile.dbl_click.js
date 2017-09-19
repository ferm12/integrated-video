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
            } else {
                this.setEndpoint(0.25);
            }
        };

        // Fade up immediately on click, a second click is needed on the Vimeo player once it's visible
        this.start = function () {
            var self = this,
                $container = $(this.container),
                to;
            // Wrap the end call in this function so the proper binding can be added
            function hideWhenDone() {
                self.end();
                self.video.removeEvent("end", hideWhenDone);
            }

            function disableReset() {
                console.log("disable reset");
                self.video.removeEvent("play", disableReset);
                clearTimeout(to);
            }

            function resetWhenPaused() {
                to = setTimeout(function() {
                    console.log("reset");
                    self.hide(function () {
                        if (self.resetRewind) {
                            self.video.rewind();
                        }
                    });
                    $container.off("click", disableReset);
                    self.video.removeEvent("pause", resetWhenPaused);
                    clearTimeout(to);
                }, 5000);


                self.video.addEvent("play", disableReset);
            }

            function autoplay() {
                self.userActivated = true;
                self.video.removeEvent("play", autoplay);
            }

            if (self.userActivated) {
                this.video.play();
            } else {
                this.video.addEvent("play", autoplay);
            }

            this.show();
            console.log("done show");
            this.video.addEvent("end", hideWhenDone);

            if (this.pauseReset) {
                this.video.addEvent("pause", resetWhenPaused);
            }
        };
    };
}());