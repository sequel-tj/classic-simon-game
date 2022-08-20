var level = 0;
var started = false;
var bestScore = 0;
var currentScore = 0;
const colorList = ["green", "red", "yellow", "blue"];

computerList = [];
playerList = [];


function startGame() {
    if(!started) {
        document.querySelector("h1").innerHTML = "Level " + level;
        document.querySelector("button").classList.add("btnHide");
        computerPattern();
        started = true;
    }
}


function computerPattern() {
    level++;
    document.querySelector("h1").innerHTML = "Level " + level;
    var i = 0;
    myloop(i);
}


document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener('click', (event) => {
        var eventID = event.srcElement.id;
        playerList.push(colorList.indexOf(eventID));

        playSound(eventID);
        animatePress(eventID);
        checkAnswer(playerList.length-1);
    })
});


function checkAnswer(currentMove) {
    if (computerList[currentMove] === playerList[currentMove]) {
        if (computerList.length === playerList.length) {
            setTimeout(() => {
                computerPattern();
            },300);

            if (bestScore < level) {
               bestScore = level;
               document.querySelector("#best-score span").innerHTML = level;
           }
        }
    }
    else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("h1").innerHTML = "Game Over";


        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        startOver();
    }
}



function myloop(i) {
    setTimeout(() => {
        var colorIndex = Math.floor(Math.random() * 10 / 3);
        computerList.push(colorIndex);

        var eventID = colorList[colorIndex];
        var element = "#" + eventID;

        playSound(eventID);
        animatePress(eventID, 200);

        i++;
        if (i<level) {
            myloop(i);
        }
    }, 500);
}


function playSound(eventID) {
    var audio = new Audio("sounds/" + eventID + ".mp3");
    audio.play();
}

function animatePress(eventID, time = 200) {
    var event = document.querySelector("#"+eventID);
    event.classList.add("pressed");
    setTimeout(() => {
        event.classList.remove("pressed");
    }, time);
}

function startOver() {
    level = 0;
    computerList = [];
    playerList = [];
    started = false;
    document.querySelector("button").classList.remove("btnHide");
    document.querySelector("button").innerHTML = "RESTART"
}
