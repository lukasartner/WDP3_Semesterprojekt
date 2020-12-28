let i = 0;
let local;
var points = 1000;
let score = 0;
var interval = setInterval(startTimer, 50);

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/16XH56MWaPFG8bSGWp4UdhmR7og1OMNGIyvLf1FZUc1Q/edit?usp=sharing';

function init() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: saveArray,
        simpleSheet: true
    })
};

function saveArray(data, tabletop) {
    local = data;
    game();
}


window.addEventListener('DOMContentLoaded', init);

window.onload = function () {
    document.getElementById("clickMe").addEventListener("click", submitInput)
    document.getElementById("joker").addEventListener("click", HideWrongHint)

};


function HideWrongHint() {
    if (document.getElementById(local[i].FalscherHinweis).style.visibility != "hidden") {
        document.getElementById(local[i].FalscherHinweis).style.visibility = "hidden";
        if (points >= 100) points -= 100;
    }
}

function submitInput() {
    if (document.getElementById('input').value == local[i].Antwort.toUpperCase()) {
        document.getElementById("input").value = "";
        console.log(points);
        score += points;
        points = 1000;
        document.getElementById("Score").innerHTML = "Score: " + score;
        document.getElementById(local[i].FalscherHinweis).style.visibility = null;
        i++; game();
    } else {
    document.getElementById("runningGame").style.visibility = "hidden";
    document.getElementById("gameOver").style.visibility = "visible";
    }
    ;
}

function game(data, tabletop) {
    document.getElementById("QuestionNumber").innerHTML = "Frage Nr: " + local[i].FrageNr;
    document.getElementById("HintOne").innerHTML = local[i].HintOne;
    document.getElementById("HintTwo").innerHTML = local[i].HintTwo;
    document.getElementById("HintThree").innerHTML = local[i].HintThree;
    document.getElementById("HintFour").innerHTML = local[i].HintFour;
    document.getElementById("input").maxLength = local[i].Antwort.length;
    document.getElementById("input").style.width = (1.5 * local[i].Antwort.length - 0.01) + 'ch';
    startTimer();
}

function startTimer() {
    document.getElementById("points").innerHTML = "Punkte: " + points;
    if (points < 1) {
        clearInterval(interval);
        return;
    }
    points -= 1;
}