if (screen.width <= 699) {
document.location = "mobile.html";
}
console.log(screen.width);

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
console.log("userChosenColour = "+userChosenColour);
console.log("userClickedPattern = "+userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("Wrong!");

    playSound("wrong");


    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


    $("#level-title").html("Game Over Bud! 🤣 <br> High Score: "+(level-1)+"<br> Press Any Key For a Rematch");
    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
console.log("randomChosenColour = "+randomChosenColour);
console.log("gamePattern = "+gamePattern);

//This provides the entie pattern. Fetches data rom the array in time intervals
  var alertLoop = function(i) {
      if (gamePattern[i]) {
        pattern = gamePattern[i];
        $("#" + pattern).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(pattern);
          setTimeout(function(){alertLoop(i+1);}, 500);
      }
  }
  alertLoop(0);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
