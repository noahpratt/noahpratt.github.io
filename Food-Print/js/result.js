let resultsArray = [];
let resultTotal = document.getElementById("resultsTotal");
let resultRequest = new XMLHttpRequest();
// var tableSpace = document.getElementById("tableContainer");
resultRequest.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    resultsArray = JSON.parse(this.responseText);

    var resultsTable = document.createElement("TABLE");
    var tableSpace = document.getElementById("tableContainer");
    tableSpace.appendChild(resultsTable);
    var carbonSum = 0;
    for(let i = 0; i < resultsArray.length; i++) {
      let value = Number(Object.values(resultsArray[i]));
      var inputArr = [
        String(Object.keys(resultsArray[i])),
        (Math.round(value * 100) / 100).toFixed(2)
      ]
      carbonSum += Number((Math.round(value * 100) / 100).toFixed(2));
      inputResults(inputArr, resultsTable);
    }
    resultTotal.innerHTML += carbonSum;
  }
};
resultRequest.open("GET", "../result.txt", true);
resultRequest.send();

// document.addEventListener('keydown', keyDownHandler, false);

// TIMER IF IT CAN'T LOAD -----------------------------------------------------
// window.addEventListener('load', setTimer);
// function setTimer(){
//   setTimeout(function(){results=true;}, 6000)
//   myTimer = setInterval(checkResults, 100);
//   console.log("timer");
// }

function checkResults(){
  if (results) {
    console.log("Results are in!");
    console.log(results);
  }
}

let tableSpace = document.getElementById("tableContainer");
function inputResults(textArr, table) {
  var setRow = document.createElement("TR");
  for (var i = 0; i < textArr.length; i++) {
    var setCell = document.createElement("TD");
    var cellText = document.createTextNode(textArr[i]);
    setCell.appendChild(cellText);
    setRow.appendChild(setCell);
  }
  table.appendChild(setRow);
}
