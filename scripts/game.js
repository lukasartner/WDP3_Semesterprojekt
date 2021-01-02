const FULL_DASH_ARRAY = 263;
const INIT_SCORE = 0;
const INIT_POINTS = 1000;
let score = INIT_SCORE;
let i = 0;
let localGameArray;
let points;
let interval;
let hideWrongHintAvailable = true;
let nextQuestionAvailable = true;

let gameURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Tr6qirvN9nEfFtNrOO7qzIDEE5Aj7tc8D_MhVOgPiNkkUXuYRT7mOFwu6Wt08eMaT_9yi66XV8Vf/pub?output=csv';

function initGame() {
    document.getElementById("newGame").disabled = true;
    Papa.parse(gameURL, {
        download: true,
        header: true,
        complete: function(results) {
            localGameArray = results.data;
            startNewGame();
        }
    });
}

window.onload = function() {
    document.getElementById("newGame").addEventListener("click", initGame);
    document.getElementById("answer").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submitAnswer").click();
        }
    });
    circularTimer();
    resetPoints();
};

function resetPoints() {
    points = INIT_POINTS;
}

function startNewGame() {
    document.getElementById("beforeGame").style.display = "none";
    document.getElementById("logoSection").style.display = "none";
    document.getElementById("runningGame").style.display = "block";
    document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
    document.getElementById("hideWrongHintButton").addEventListener("click", hideWrongHint);
    document.getElementById("nextQuestionButton").addEventListener("click", nextQuestion);
    score = INIT_SCORE;
    clearInterval(interval);
    game();
}

function hideWrongHint() {
    if (document.getElementById(localGameArray[i].FalscherHinweis).style.visibility != "hidden" && hideWrongHintAvailable) {
        document.getElementById(localGameArray[i].FalscherHinweis).style.visibility = "hidden";
        hideWrongHintAvailable = false;
        document.getElementById("hideWrongHintButton").disabled = true;
        document.getElementById("hideWrongHintSVG").appendChild(drawCross());
    }
}

function nextQuestion() {
    if (nextQuestionAvailable) {
        clearInterval(interval);
        resetPoints();
        document.getElementById(localGameArray[i].FalscherHinweis).style.visibility = null;
        if (localGameArray[++i] !== undefined) {
            game();
            circularTimer();
        } else finish();
        nextQuestionAvailable = false;
        document.getElementById("nextQuestionButton").disabled = true;
        document.getElementById("nextQuestionSVG").appendChild(drawCross());
    }
}

function drawCross() {
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    newElement.setAttribute("d", "M 10,10 L 490,490 M 490,10 L 10,490"); //Set path's data
    newElement.style.stroke = "#ffffff"; //Set stroke colour
    newElement.style.strokeWidth = "30px"; //Set stroke width  
    return newElement;
}

function submitAnswer() {
    clearInterval(interval);
    if (document.getElementById('answer').value.toUpperCase() == localGameArray[i].Antwort.toUpperCase()) {
        document.getElementById("answer").value = "";
        score += points;
        resetPoints();
        document.getElementById("currentScore").innerHTML = score;
        document.getElementById(localGameArray[i].FalscherHinweis).style.visibility = null;
        if (localGameArray[++i] !== undefined) {
            game();
            circularTimer();
        } else {
            document.getElementById("scoreMessage").innerHTML = `
              Durchgespielt!<br>Herzlichen Glückwunsch
              `;
            finish();
        }
    } else {
        document.getElementById("scoreMessage").innerHTML = "Falsche Antwort";
        finish();
    }
}

function finish() {
    document.getElementById("runningGame").style.display = "none";
    document.getElementById("afterGame").style.display = "block";
    document.getElementById("yourScore").innerHTML = `Du hast ${score} Punkte erreicht!`;
}

function game() {
    document.getElementById("QuestionNumber").innerHTML = `
      <div class="question-number-text">
        Frage ${i + 1}
      </div>
      `;
    document.getElementById("lookingFor").innerHTML = createLookingForText(localGameArray[i].GesuchtIst);
    document.getElementById("HintOne").innerHTML = createHintText(localGameArray[i].HintOne);
    document.getElementById("HintTwo").innerHTML = createHintText(localGameArray[i].HintTwo);
    document.getElementById("HintThree").innerHTML = createHintText(localGameArray[i].HintThree);
    document.getElementById("HintFour").innerHTML = createHintText(localGameArray[i].HintFour);
    document.getElementById("answer").maxLength = localGameArray[i].Antwort.length;
    document.getElementById("answer").style.width = (1.5 * localGameArray[i].Antwort.length - 0.01) + 'ch';
    document.getElementById("answer").autofocus = true;
    interval = setInterval(startTimer, 50);
}

function createLookingForText(text) {
    return `
      <div class="looking-for-inner1">
        <div class="looking-for-inner2">
          <div class="looking-for-inner3">
            <div class="looking-for-inner-text">
              ${text}
            </div>
          </div>
        </div>
      </div>
      `;
}

function createHintText(text) {
    return `<div class="hint-inner-text">${text}</div>`;
}

function startTimer() {
    setCircleDasharray();
    if (points === 0) {
        clearInterval(interval);
        document.getElementById("base-timer-path-remaining").style.display = "none";
    } else
        points--;
    document.getElementById("points").innerHTML = points;
}

function circularTimer() {
  document.getElementById("countdown").innerHTML = `
    <div class="base-timer">
      <span id="points" class="base-timer__label"></span>
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      </div>
    `;
}

function calculateTimeFraction() {
    const rawTimeFraction = points / INIT_POINTS;
    return rawTimeFraction - (1 / INIT_POINTS) * (1 - rawTimeFraction);
}

// Update the dasharray value as time passes, starting with 283
function setCircleDasharray() {
    const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

(function() {
    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {

            if (elements[k].name === "honeypot") {
                honeypot = elements[k].value;
                return false;
            }
            return true;
        }).map(function(k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name) {
            var element = elements[name];
            if (name === "Punkte")
                formData[name] = score;
            else
                formData[name] = element.value;
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "Table"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

        return {
            data: formData,
            honeypot: honeypot
        };
    }

    function handleFormSubmit(event) {
        event.preventDefault(); // we are submitting via xhr below
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        console.log(formData.honeypot); // handles form submit without any jquery
        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
            return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var formElements = form.querySelector(".form-elements");
                if (formElements) {
                    formElements.style.display = "none"; // hide form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                    thankYouMessage.style.display = "block";
                    location.reload();
                }
            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    }

    function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    }
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();