// firstly, npm install `webpack` `webpack-cli`.
// secondly, npm install `jquery` locally.
// thirdly, `webpack --mode=development src/img-rollover.js -o dist/bundle.js`.
import $ from 'jquery';

$(function () {
    for (var i = 0; i < document.images.length; i++) {
        var img = document.images[i];
        var rollover = img.getAttribute("data-rollover");
        if (!rollover) continue;

        (new Image()).src = rollover;
        img.setAttribute("data-rollout", img.src);

        img.onmouseenter = function () {
            this.src = this.getAttribute("data-rollover");
        };
        img.onmouseout = function () {
            this.src = this.getAttribute("data-rollout");
        };
    }
});