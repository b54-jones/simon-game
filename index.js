var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var level = 0;
var userClickedPattern = [];

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
});

function nextLevel() {
    $("#level-title").text("Level " + level++)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(color) {
    const el = $("#" + color);
    el.addClass("pressed")
    setTimeout(function () {
        el.removeClass("pressed");
    }, 100);
}

let started = false;
$("html").keydown(function() {
    if (!started) {
        nextLevel()
    }
    started=true;
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            userClickedPattern = []
            setTimeout(function () {
                nextLevel();
            }, 1000);
        }
    } else {
        const audio = new Audio("./sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started=false;
}