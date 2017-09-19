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


	IV.isMobile = function () {
    	return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera));

	};

}());
