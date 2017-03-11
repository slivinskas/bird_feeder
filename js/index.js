/**
 * Created by slivinskas on 2017-03-11.
 */



(function () {
    "use strict";

})();

function sukamesIkaire() {
    $.ajax({
        url: "http://192.168.43.165/decoder_control.cgi?command=4", jsonp: "callback", dataType: "jsonp"
    });
}

function sukamesIdesine() {
    $.ajax({
        url: "http://192.168.43.165/decoder_control.cgi?command=6", jsonp: "callback", dataType: "jsonp"
    });
}

function stop() {
    $.ajax({
        url: "http://192.168.43.165/decoder_control.cgi?command=29", jsonp: "callback", dataType: "jsonp"
    });
}

function ratu() {
    "use strict";
    sukamesIkaire();
    setTimeout(function () {
        sukamesIdesine();
        setTimeout(function () {
            stop();
        },5000);
    }, 5000);
}