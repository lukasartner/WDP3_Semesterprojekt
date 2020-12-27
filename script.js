let i = 1;

window.onload = function () {
    let button = document.getElementById("clickMe");
    button.addEventListener("click", iterate)
   };

function iterate() {
document.getElementById("QuestionNumber").innerHTML = "Question " + i++;
document.getElementById("HintOne").innerHTML = "Hinweis 1";
document.getElementById("HintTwo").innerHTML = "Hinweis 2";
document.getElementById("HintThree").innerHTML = "Hinweis 3";
document.getElementById("HintFour").innerHTML = "Hinweis 4";
}

