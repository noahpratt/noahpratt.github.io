// function myFunction() {
//   var x = document.getElementById("myLinks").children;
//   for(i in x) {
//     if (x[i].style.display === "block") {
//       x[i].style.display = "none";
//     } else {
//       x[i].style.display = "block";
//       x[i].style.float = "none";
//     }
//   }
// }

function myFunction() {
  var x = document.getElementById("navBar");
  if (x.className === "header-container") {
    x.className += " responsive";
  } else {
    x.className = "header-container"
  }
}

window.onload = function() {checkScroll()};
window.onscroll = function() {checkScroll()};
let yPosition = 0;
let secondNav = document.getElementById("secondary-nav");

function checkScroll() {
  yPosition = document.documentElement.scrollTop;
  if (yPosition > 110) {
    secondNav.style.opacity = "1";
  } else if (yPosition < 80) {
    secondNav.style.opacity = "0";
  }
}
