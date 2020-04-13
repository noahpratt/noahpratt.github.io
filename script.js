function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
document.onload = function() {checkScroll()};
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
