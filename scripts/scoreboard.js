let localScoreboardArray;
const scoresToDisplay = 10;

let scoreboardURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRjf9RbLjA6czrzQtmX8EEBXHHlnwWra78jWw-_9pUW2KtaOAwVk8PBkm0hpX1TOL8VfAu1jeldvHOz/pub?output=csv';

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


function buildHtmlTable(selector) {
    var columns = addAllColumnHeaders(localScoreboardArray, selector);
    const highestScore = localScoreboardArray[0][columns[2]];
    var scorePct;
    for (var i = 0; i < scoresToDisplay; i++) {
      var row$ = $('<tr/>');
      for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var cellValue = localScoreboardArray[i][columns[colIndex]];
        if (cellValue == null) cellValue = "";
        row$.append($(`<td class="column${columns[colIndex]}"/>`).html(cellValue));
      }
      scorePct = Math.floor(localScoreboardArray[i][columns[2]] / highestScore * 100) + "%";
      row$.append($(`<td class="columnRatio RatioRow${i}" style="position: relative;"\>`).html(`<div style="width: ${scorePct}; height: 100%; background: #a2a2a2; margin: 0px; padding: 0px; position: absolute; top: 0; left: 0; border-right: solid 2px #565656;">${scorePct}</div>`));
      //style="width:${scorePct}; background='red'/>
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
          headerTr$.append($(`<th class="column${key}"/>`).html(key));
        }
      }
    }
    headerTr$.append($('<th class="columnRatio"/>').html("Ratio"));
    $(selector).append(headerTr$);
  
    return columnSet;
  }

window.onload = function () {
    initScoreboard();
};