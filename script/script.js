"use strict";

const imageSlider = document.querySelector(".heroSection .container img");
const containerTextSlider = document.querySelector(
  ".heroSection .container .text"
);
const textSlider = document.querySelector(
  ".heroSection .container .text .text-slider"
);
const sliderNavItems = document.querySelectorAll(
  ".heroSection .container .navigation .item"
);
// Convert NodeList to array
const itemsArray = Array.from(sliderNavItems);
const textOfSlider = [
  "Combo baked bread today",
  "Combo Cake Today",
  "Set Chocolate cake",
];

// Hero Section
let slideNumber = 1;
let sliderInterval;
// Handles the fade-out and disappear effects for the transition.
function startTransitionEffect() {
  imageSlider.classList.add("fade-out");
  containerTextSlider.classList.add("disappear");
}

// Resets the transition effects.
function resetTransitionEffect() {
  imageSlider.classList.remove("fade-in");
  containerTextSlider.classList.remove("appear");
}

// Updates the active button (navigation item) based on the current slide number.
function updateActiveButton(slideNumber) {
  itemsArray.forEach((item) => item.classList.remove("active"));
  const [item] = itemsArray.filter((item) =>
    item.classList.contains(`item-${slideNumber}`)
  );
  if (item) item.classList.add("active");
}

// Updates the slider content (image and text) based on the slide number.
function updateSliderContent(slideNumber) {
  imageSlider.setAttribute("src", `Images/slider-${slideNumber}.webp`);
  imageSlider.setAttribute("alt", `product-${slideNumber}`);
  textSlider.textContent = textOfSlider[slideNumber - 1];
  textSlider.setAttribute("tabindex", slideNumber);
}

// Handles the slider update with smooth transition effects.
function updateSlider(slideNumber) {
  updateActiveButton(slideNumber);
  updateSliderContent(slideNumber);

  containerTextSlider.classList.remove("disappear");
  containerTextSlider.classList.add("appear");
  imageSlider.classList.remove("fade-out");
  imageSlider.classList.add("fade-in");

  setTimeout(resetTransitionEffect, 1000);
}

// Advances the slider to the next slide.
function advanceSlider() {
  slideNumber = (slideNumber % textOfSlider.length) + 1;
  updateSlider(slideNumber);
}

// Automatically advances the slider with a delay.
function autoAdvanceSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }

  sliderInterval = setInterval(() => {
    startTransitionEffect();
    setTimeout(advanceSlider, 1000);
  }, 10000);
}

// Handles navigation item click events.
function handleNavigationClick() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
      const clickedItemClass = e.target.classList;
      const matchedClass = [...clickedItemClass].find((cls) =>
        cls.startsWith("item-")
      );
      if (matchedClass) {
        const slideIndex = parseInt(matchedClass.split("-")[1], 10);
        if (!isNaN(slideIndex)) {
          slideNumber = slideIndex;

          // Smooth transition effect on click
          startTransitionEffect();
          setTimeout(() => {
            updateSlider(slideNumber);
            autoAdvanceSlider(); // Reset the interval after updating the slider
          }, 1000);
        }
      }
    }
  });
}

// Initializes the slider
function initializeSlider() {
  updateSlider(slideNumber);
  autoAdvanceSlider();
  handleNavigationClick();
}

// First render
initializeSlider();

// document.addEventListener("DOMContentLoaded", () => {
//   const menuIcon = document.querySelector(".menu-icon");
//   const navItems = document.querySelector(".items");

//   menuIcon.addEventListener("click", () => {
//     navItems.classList.toggle("active");
//   });
// });

//End of Hero Section
// const product = {
//   id: "number",
//   name: "string",
//   description: "string",
//   category: "string",
//   price: "Number",
//   offer: "Boolean",
//   rate: "Number",
//   ingredients: [],
// };
