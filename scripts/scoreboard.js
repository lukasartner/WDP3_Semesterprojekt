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
    initScoreboard();
};