/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files
import './index.html';

// Stylesheets
import './css/main.scss';

// Scripts
import './js/main.js';

// Select navbar, sections, and links
const navbar = document.getElementById('navbar_sticky');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar_sticky a');

// Navbar scroll behavior
window.addEventListener('scroll', () => {
  let current = "";

  sections.forEach(sec => {
    const secTop = sec.offsetTop - 70; // adjust for navbar height
    const secHeight = sec.offsetHeight;

    if (scrollY >= secTop && scrollY < secTop + secHeight) {
      current = sec.getAttribute("id");
    }
  });

  // Force last section active if at bottom
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    current = sections[sections.length - 1].getAttribute("id");
  }

  // Navbar shrink
  if (scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }

  // Highlight nav links
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const buttons = document.querySelectorAll("[button_cr]");

buttons.forEach(button =>{
    button.addEventListener("click", () => {
        console.log("in carousel")
        const offset = button.getAttribute("button_cr") === "next" ? 1 : -1;
        const slides = button.closest("[carousel]").querySelector("[slides]");

        const activeSlide = slides.querySelector("[current]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].setAttribute("current", true);
        activeSlide.removeAttribute("current");
    });
});

// Modal-related code

// Get the modal and buttons
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Open the modal when the button is clicked
openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = 1;
        modal.style.visibility = "visible";
    }, 100);
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", () => {
    modal.style.opacity = 0;
    modal.style.visibility = "hidden";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalBtn.click();
    }
});
