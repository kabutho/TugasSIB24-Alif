// Carousel
let slideIndex = 0;
showSlides();

function showSlides(n) {
   let i;
   let slides = document.getElementsByClassName("mySlides");
   if (n > slides.length) {
      slideIndex = 1;
   }
   if (n < 1) {
      slideIndex = slides.length;
   }
   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   // slides[slideIndex - 1].style.display = "block";
   slideIndex++;
   if (slideIndex > slides.length) {
      slideIndex = 1;
   }
   slides[slideIndex - 1].style.display = "block";
   setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Responsive Nav
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
   menuList.classList.toggle("hidden");
});
