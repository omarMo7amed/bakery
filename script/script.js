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

// Array of product data
// Reference to the container, modal, and overlay
const contentContainer = document.querySelector(".best-seller .content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Product data
const products = [
  {
    name: "Plain Croissant",
    category: "Pastry",
    price: "$2.50",
    image: "Images/single-product-01.webp",
    ingredients: "Flour, Butter, Sugar, Yeast, Milk",
    description: "A buttery and flaky pastry perfect for breakfast or snacks.",
  },
  {
    name: "Baguette",
    category: "Bread",
    price: "$3.00",
    image: "Images/single-product-02.webp",
    ingredients: "Flour, Water, Yeast, Salt",
    description:
      "A classic French bread with a crispy crust and soft interior.",
  },
  {
    name: "Madeleine",
    category: "Pastry",
    price: "$1.50",
    image: "Images/single-product-03.webp",
    ingredients: "Flour, Sugar, Eggs, Butter, Lemon Zest",
    description: "Soft and spongy, these little cakes are a delightful treat.",
  },
  {
    name: "Chocolate Croissant",
    category: "Pastry",
    price: "$3.50",
    image: "Images/single-product-04.webp",
    ingredients: "Flour, Butter, Chocolate, Sugar, Yeast, Milk",
    description: "A rich, chocolate-filled delight for sweet lovers.",
  },
  {
    name: "Pain de Campagne",
    category: "Bread",
    price: "$4.00",
    image: "Images/single-product-05.webp",
    ingredients: "Flour, Water, Yeast, Salt, Sourdough Starter",
    description: "A rustic French country bread with a hearty flavor.",
  },
];

products.forEach((product, index) => {
  const productHTML = `
    <div class="product" data-index="${index}">
      <img src="${product.image}" alt="${product.name}" />
      <div class="text">
        <p class="name">${product.name}</p>
        <span class="category">${product.category}</span>
        <p class="price">${product.price}</p>
      </div>
      <ul class="product-options">
        <li class="info" title="View Details"><i class="fa-solid fa-info"></i></li>
        <li title="Add to Wishlist"><i class="fa-regular fa-heart"></i></li>
        <li title="Add to Cart"><i class="fa-solid fa-cart-shopping"></i></li>
      </ul>
    </div>
  `;

  // Append the product to the container
  contentContainer.insertAdjacentHTML("beforeend", productHTML);
});

//  show the modal
contentContainer.addEventListener("click", (e) => {
  const infoIcon = e.target.closest(".info");
  if (!infoIcon) return;

  const productElement = infoIcon.closest(".product");
  const index = productElement.dataset.index;
  const item = products[index];

  // Populate the modal
  modal.querySelector(".modal-image").setAttribute("src", item.image);
  modal.querySelector(".modal-image").setAttribute("alt", item.name);
  modal.querySelector(".modal-title").textContent = item.name;
  modal.querySelector(
    ".modal-ingredients"
  ).textContent = `Ingredients: ${item.ingredients}`;
  modal.querySelector(".modal-description").textContent = item.description;

  // Show the modal
  overlay.classList.add("active");
  modal.classList.add("active");
});

// Function to close the modal
function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}

document.querySelector(".close-modal").addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});
