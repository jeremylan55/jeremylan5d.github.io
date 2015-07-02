var time_, hrs =0, min=0, sec=0;

function arc() {
document.getElementById("alert").style.visibility = "hidden";
digitalClock();
var archtype = Raphael("canvas", 500, 500);
archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
    var alpha = 360 / total * value,
        a = (90 - alpha) * Math.PI / 180,
        x = xloc + R * Math.cos(a),
        y = yloc - R * Math.sin(a),
        path;
    if (total == value) {
        path = [
            ["M", xloc, yloc - R],
            ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
        ];
    } else {
        path = [
            ["M", xloc, yloc - R],
            ["A", R, R, 0, +(alpha > 180), 1, x, y]
        ];
    }
    return {
        path: path
    };
};

//make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
var my_arc = archtype.path().attr({
    "stroke": "#fff",
    "stroke-width": 20,
    arc: [250, 250, 0, 100, 120]
});

my_arc.animate({
    arc: [250, 250, 100, 100, 120]
}, time_);
}

function getTime() {
    hrs= document.getElementById("userHour").value;
    min= document.getElementById("userMin").value;
    sec= document.getElementById("userSec").value;

    time_ = ((hrs*60*60) + (min*60) + sec)*1000;
}

function hideInput() {
    document.getElementById("userHour").style.visibility = "hidden";
    document.getElementById("userMin").style.visibility = "hidden";
    document.getElementById("userSec").style.visibility = "hidden";
}

function checkInput() {
    if(time_ <= 0 || (time_%time_) != 0 || sec > 59 || min > 59){
    document.getElementById("alert").innerHTML ="INVALID TIME"
    return false;
    }
    return true;
}

function runTimer() {
    getTime();
    if(checkInput()){
        hideInput();
        arc();
    }
}

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds
}

function digitalClock() {
    var tempTime = time_;
    
    setInterval(function() { 
        tempTime--;
        msToTime(tempTime);
        },1);
}