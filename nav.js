function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.onload = function() {checkScroll()};
window.onscroll = function() {checkScroll()};
let yPosition = 0;
let secondNav = document.getElementById("secondary-nav");
let docHeight = document.body.scrollHeight;
let winHeight = window.innerHeight;

let sideNav = document.getElementById("floating-nav");

var loadTimer = setTimeout(function(){
  docHeight = document.body.scrollHeight;
  console.log("Hello!");
}, 2000);

function checkScroll() {
  yPosition = document.documentElement.scrollTop;
  if (yPosition > 110) {
    secondNav.style.opacity = "1";
  } else if (yPosition < 80) {
    secondNav.style.opacity = "0";
  }
  if (yPosition + winHeight + 140 < docHeight) {
    sideNav.style.top = yPosition + (window.innerHeight/4) + "px";
    sideNav.style.height = sideNav.style.height - 300;
  } else {
    console.log("Doc Height", docHeight);
    console.log("Combined: ", yPosition + winHeight);
  }
}
