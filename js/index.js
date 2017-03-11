/**
 * Created by slivinskas on 2017-03-11.
 */



(function () {
    "use strict";

})();

function sukames() {
    $.ajax({
        url: "http://192.168.43.165/decoder_control.cgi?command=4", jsonp: "callback", dataType: "jsonp"
    });
}

function stop() {
    $.ajax({
        url: "http://192.168.43.165/decoder_control.cgi?command=29", jsonp: "callback", dataType: "jsonp"
    });
}