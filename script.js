function myFunction() {
  console.log("..");
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block"
  }
}

var links = document.getElementsByClassName("project-grid-item");
for(let i = 0; i < links.length; i++) {
 links[i].addEventListener("click", function(){
   window.location = this.dataset.link;
 });
};


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

window.onresize = function() {
  var w = window.outerWidth;
  var menu = document.getElementById("myLinks");
  if (w > 726) {
    if (menu.style.display === "none") {
      menu.style.display = "block";
    }
  }
};
