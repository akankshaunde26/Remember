var buttonClr = ["green","red","blue","yellow"];
var level = 0;
var start = false;
var gamePattern = [];
var userPattern = [];

$(document).keypress(function() {
    if(!start){
        $("h1").text("Level 1 ");
        next();
        start = true;
    }
});

$(".btn").click(function() {
    var userClr = $(this).attr("id");
    userPattern.push(userClr);
    playSound(userClr);
    animate(userClr);
    check(userPattern.length - 1);
});

function next() {
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomClr = buttonClr[Math.floor(Math.random() * 4)];
    gamePattern.push(randomClr);
    $("#" + randomClr).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomClr);
}

function playSound(name) {
    var audio = new Audio("sound/" + name + ".mp3");
    audio.play();
}

function animate(currentClr) {
    $("#" + currentClr).addClass("pressed");
    setTimeout(function() {
        $("#" + currentClr).removeClass("pressed");
    },100);
}

function check(currentLevel) {
    if(gamePattern[currentLevel] === userPattern[currentLevel]) {
        if(userPattern.length === gamePattern.length) {
            setTimeout(function() {
                next();
            },1000)
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, press any key to restart.");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    start = false;
}

