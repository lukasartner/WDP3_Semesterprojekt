/***********
* Modalbox *
***********/

// Get the modal
let modal1 = document.getElementById("modal-beschreibung");
let modal2 = document.getElementById("modal-details");
let modal3 = document.getElementById("modal-technologien");
let modal4 = document.getElementById("modal-lukas");
let modal5 = document.getElementById("modal-patrick");

// Get the button that opens the modal
let btn1 = document.getElementById("button-beschreibung");
let btn2 = document.getElementById("button-details");
let btn3 = document.getElementById("button-technologien");
let btn4 = document.getElementById("button-lukas");
let btn5 = document.getElementById("button-patrick");

// Get the <span> element that closes the modal
let span1 = document.getElementById("close-beschreibung");
let span2 = document.getElementById("close-details");
let span3 = document.getElementById("close-technologien");
let span4 = document.getElementById("close-lukas");
let span5 = document.getElementById("close-patrick");


// When the user clicks on the button, open the modal
btn1.onclick = function() {
  modal1.style.display = "block";
};
btn2.onclick = function() {
    modal2.style.display = "block";
  };
btn3.onclick = function() {
    modal3.style.display = "block";
  };
btn4.onclick = function() {
    modal4.style.display = "block";
  };
btn5.onclick = function() {
    modal5.style.display = "block";
  };

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
};
span2.onclick = function() {
    modal2.style.display = "none";
  };
span3.onclick = function() {
    modal3.style.display = "none";
  };
span4.onclick = function() {
    modal4.style.display = "none";
  };
span5.onclick = function() {
    modal5.style.display = "none";
  };

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
  else if (event.target == modal4) {
    modal4.style.display = "none";
  } 
  else if (event.target == modal5) {
    modal5.style.display = "none";
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
  let slides = document.getElementsByClassName("slide");
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
  let slides = document.getElementsByClassName("slide");
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