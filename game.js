var colors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userclickedpattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    $("body").addClass("startover");
    setTimeout(function () {
        $("body").removeClass("startover");
    }, 100);
    if (started == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userclickedpattern = [];
    level++;
    $('#level-title').text("Level " + level);
    var randomNumbers = Math.random();
    randomNumbers = Math.floor(randomNumbers * 4);
    var randomchosencolor = colors[randomNumbers];
    gamepattern.push(randomchosencolor);
    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomchosencolor);
}

$('.btn').click(function () {
    var userchosencolor = this.id;
    userclickedpattern.push(userchosencolor);
    makeSound(userchosencolor);
    animatepress(userchosencolor)
    checkAnswer(userclickedpattern.length - 1)
});

function animatepress(currentcolor) {
    var activebutton = $("." + currentcolor);
    activebutton.addClass("pressed");
    setTimeout(function () {
        activebutton.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentlevel) {
    if (gamepattern[currentlevel] == userclickedpattern[currentlevel]) {
        console.log("success")
        if (gamepattern.length == userclickedpattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong")
        makeSound("wrong");
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}
function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}
function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}