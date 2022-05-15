let gamePatern = [];
let userClickedPattern = [];
let buttonColour = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

$(document).keypress(() => {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColour[randomNum];

  gamePatern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePatern[currentLevel]) {
    if (gamePatern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press the restart button to play!");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePatern = [];
}

$("#restart").click(() => {
  $("#level-title").text("Game restarted!");
  setTimeout(() => {
    startOver();
    nextSequence();
  }, 2000);
});
