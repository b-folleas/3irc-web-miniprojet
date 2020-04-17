/* Scroll back to top button script */

// To be declared as global in the script and used in every function
let backToTopBtn;

// When the page is loaded, it will call the loadFunction
window.addEventListener("load", loadFunction);

// When the user scrolls down 30px from the top of the document, show the button
window.addEventListener("scroll", scrollFunction);

function loadFunction() {
  document.getElementById("back-top-div").innerHTML =
    `<button onclick="topFunction()" class="btn" id="back-top-btn" title="Go to top"><i class="fa fa-arrow-up"></i></button>`;

  //Get the button:
  backToTopBtn = document.getElementById("back-top-btn");
}

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document

function topFunction() {
  //document.body.scrollTop = 0; // For Safari
  //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  // Better animation
  (function smoothscroll() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  })();
}