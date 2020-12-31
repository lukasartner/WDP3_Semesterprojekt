let i = 0;
let localGameArray;
let localScoreboardArray;
let points;
const initScore = 0;
let score = initScore;
let interval;
const scoresToDisplay = 10;
const initPoints = 1000;

let gameURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Tr6qirvN9nEfFtNrOO7qzIDEE5Aj7tc8D_MhVOgPiNkkUXuYRT7mOFwu6Wt08eMaT_9yi66XV8Vf/pub?output=csv';
let scoreboardURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjf9RbLjA6czrzQtmX8EEBXHHlnwWra78jWw-_9pUW2KtaOAwVk8PBkm0hpX1TOL8VfAu1jeldvHOz/pub?output=csv';

function initGame() {
    Papa.parse(gameURL, {
            download: true,
          header: true,
          complete: function(results) {
            localGameArray = results.data
            console.log(localGameArray)
            startNewGame();
          }
        })
};

function initScoreboard() {
    Papa.parse(scoreboardURL, {
            download: true,
          header: true,
          complete: function(results) {
            localScoreboardArray = results.data
            console.log(localScoreboardArray)
            document.getElementById("excelDataTable").innerHTML = ""
            buildHtmlTable('#excelDataTable')
          }
        })
};

async function saveScoreboardArray(data, tabletop) {
    localScoreboardArray = data;
    buildHtmlTable('#excelDataTable')
   // document.getElementById("scoreboard").innerHTML = (JSON.stringify(data.slice(0,10)));
    return "DONE"
}

function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(localScoreboardArray, selector);
  
    for (var i = 0; i < scoresToDisplay; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = localScoreboardArray[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
      }
      $(selector).append(row$);
    }
  }
  
  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(localScoreboardArray, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
  
    for (var i = 0; i < scoresToDisplay; i++) {
      var rowHash = localScoreboardArray[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1) {
          columnSet.push(key);
          headerTr$.append($('<th/>').html(key));
        }
      }
    }
    $(selector).append(headerTr$);
  
    return columnSet;
  }

window.onload = function () {
    document.getElementById("newGame").addEventListener("click", initGame);
    document.getElementById("submitScore").addEventListener("click", showHighscores);
    document.getElementById("showHighscore").addEventListener("click", showHighscores);
    document.getElementById("newQuestion").addEventListener("click", showQuestionSubmitter);
    initScoreboard();
    resetPoints();
};

function resetPoints() {
    points = initPoints;
}

function startNewGame() {
    document.getElementById("beforeGame").style.display = "none"
    document.getElementById("scoreboard").style.display = "none"
    document.getElementById("runningGame").style.display = "block"
    document.getElementById("clickMe").addEventListener("click", submitInput)
    document.getElementById("joker").addEventListener("click", HideWrongHint)
    score = initScore;
    clearInterval(interval);
    game();
}

function HideWrongHint() {
    if (document.getElementById(local[i].FalscherHinweis).style.visibility != "hidden") {
        document.getElementById(local[i].FalscherHinweis).style.visibility = "hidden";
        if (points >= 100) points -= 100; else points = 0;
    }
}

function submitInput() {
    clearInterval(interval);
    if (document.getElementById('input').value == localGameArray[i].Antwort.toUpperCase()) {
        document.getElementById("input").value = "";
        console.log(points);
        score += points;
        resetPoints();
        document.getElementById("Score").innerHTML = "Score: " + score;
        document.getElementById(localGameArray[i].FalscherHinweis).style.visibility = null;
        i++;
        game();
    } else {
        document.getElementById("runningGame").style.display = "none"
        document.getElementById("afterGame").style.display = "block";
    }
    ;
}

function showHighscores() {
        var x = document.getElementById("scoreboard");
        document.getElementById("beforeGame").style.display = "block"
        document.getElementById("runningGame").style.display = "none"
        document.getElementById("afterGame").style.display = "none"
        if (x.style.display === "none") {
            initScoreboard();
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
      }

function showQuestionSubmitter() {
        var x = document.getElementById("submitQuestion");
        document.getElementById("beforeGame").style.display = "none"
        document.getElementById("runningGame").style.display = "none"
        document.getElementById("afterGame").style.display = "none"
        if (x.style.display === "none") {
            initScoreboard();
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
      }

function showStartScreen(){
    document.getElementById("beforeGame").style.display = "block"
    document.getElementById("runningGame").style.display = "none"
    document.getElementById("afterGame").style.display = "none"
    document.getElementById("scoreboard").style.display = "none"
    document.getElementById("submitQuestion").style.display = "none"
}

function game() {
    document.getElementById("QuestionNumber").innerHTML = "Frage Nr: " + (i + 1);
    document.getElementById("lookingFor").innerHTML = "Gesucht ist: " + localGameArray[i].GesuchtIst;
    document.getElementById("HintOne").innerHTML = localGameArray[i].HintOne;
    document.getElementById("HintTwo").innerHTML = localGameArray[i].HintTwo;
    document.getElementById("HintThree").innerHTML = localGameArray[i].HintThree;
    document.getElementById("HintFour").innerHTML = localGameArray[i].HintFour;
    document.getElementById("input").maxLength = localGameArray[i].Antwort.length;
    document.getElementById("input").style.width = (1.5 * localGameArray[i].Antwort.length - 0.01) + 'ch';
    interval = setInterval(startTimer, 50);
}

function startTimer() {
    document.getElementById("points").innerHTML = "Punkte: " + points;
    if (points == 0) clearInterval(interval); else
    points--;
}

(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  console.log(Object.keys(elements))
      var fields = Object.keys(elements).filter(function(k) {
  
        console.log(k);
        console.log(elements[k].value);
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        if (name === "Punkte")
        formData[name] = score; else
        formData[name] = element.value;
        console.log("----------")
        console.log(formData[name])
        console.log("----------")
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "Questions"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
  
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
            var formElements = form.querySelector(".form-elements")
            if (formElements) {
              formElements.style.display = "none"; // hide form
            }
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {
              thankYouMessage.style.display = "block";
              showStartScreen();
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
   //   console.log(forms.length)
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
  })();