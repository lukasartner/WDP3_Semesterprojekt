/***********
* Modalbox *
***********/

// Get the modal
let modal1 = document.getElementById("modal-beschreibung");
let modal2 = document.getElementById("modal-details");
let modal3 = document.getElementById("modal-technologien");

// Get the button that opens the modal
let btn1 = document.getElementById("button-beschreibung");
let btn2 = document.getElementById("button-details");
let btn3 = document.getElementById("button-technologien");

// Get the <span> element that closes the modal
let span1 = document.getElementById("close-beschreibung");//[0];
let span2 = document.getElementById("close-details");//[0];
let span3 = document.getElementById("close-technologien");//[0];

// When the user clicks on the button, open the modal
btn1.onclick = function() {
  modal1.style.display = "block";
}
btn2.onclick = function() {
    modal2.style.display = "block";
  }
btn3.onclick = function() {
    modal3.style.display = "block";
  }

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
}
span2.onclick = function() {
    modal2.style.display = "none";
  }
span3.onclick = function() {
    modal3.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  } 
  else if (event.target == modal2) {
    modal2.style.display = "none";
  } 
  else if (event.target == modal3) {
    modal3.style.display = "none";
  } 
}

/************
* Slideshow *
************/

let slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Function for manual slide
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Function for auto slide
showSlidesAuto();

function showSlidesAuto() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  } 
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  // Change image every 10 seconds
  setTimeout(showSlidesAuto, 10000); 
}