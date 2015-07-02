var time_ = 0, hrs =0, min=0, sec=0;


function arc(t) {
document.getElementById("alert").style.visibility = "hidden";
digitalClock(t);
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
}, t);
}

function getTime() {
    hrs= (document.getElementById("userHour").value);
    min= (document.getElementById("userMin").value);
    sec= document.getElementById("userSec").value;
    time_ = ((hrs*60*60) + (min*60) + (sec*1))*1000;
}

function hideInput() {
    document.getElementById("userHour").style.visibility = "hidden";
    document.getElementById("userMin").style.visibility = "hidden";
    document.getElementById("userSec").style.visibility = "hidden";
}
function showInput() {
    document.getElementById("userHour").style.visibility = "visible";
    document.getElementById("userMin").style.visibility = "visible";
    document.getElementById("userSec").style.visibility = "visible";
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
        arc(time_);
        document.getElementById("timer").style.visibility = "visible";
        document.getElementById("canvas").style.visibility = "visible";
        changeButton();
    }
}

function sToTime(d) {
    if(d > 0) {
    var hours = Math.floor(d/3600);
    var minutes = Math.floor((d % 3600)/60);
    var seconds = Math.floor((d % 3600) % 60);

    if (hours <10)
        hours = "0" + hours;
    if (minutes <10)
        minutes = "0" + minutes;
    if (seconds < 10)
        seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
    }
    else{
        document.getElementById("alarmSound").play();
        document.getElementById("alarmDone").style.visibility = "visible";
        return "00:00:00";
    }

}

function digitalClock(t) {
    tempTime = t/1000;
    document.getElementById("dummyTimer").innerHTML = sToTime(tempTime)
    setTimeout(function() {
        document.getElementById("dummyTimer").style.visibility = "hidden";
    },1000)
    target = setInterval(function() { 
        tempTime--;
        document.getElementById("timer").innerHTML = sToTime(tempTime)
        },1000);
}
function changeButton() {
    document.getElementById("reset").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
}

function resetTimer() {
    location.reload();
}


