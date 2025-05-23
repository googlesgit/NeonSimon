var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100); 
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

        $("#level-title").text("Game Over! High Score: " + highScore + ". Tap or Press Any Key to Restart");


        startOver();
    }
}

function startOver() {
    if (level > highScore) {
    highScore = level;
    }

    level = 0;
    gamePattern = [];
    started = false;
}



$(document).on("keydown touchstart", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);


    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);


    console.log(userClickedPattern); 
});
