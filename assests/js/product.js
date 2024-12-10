"use strict";
const productContainer = document.querySelector(".product-container");
const modal = document.querySelector(".confirmation-modal");
const modalConfirmButton = document.querySelector(".modal-confirm");
const modalCancelButton = document.querySelector(".modal-cancel");
let productId;
let currentQuantity;

const getProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  productId = Number(urlParams.get("id"));

  try {
    const res = await fetch(
      `http://localhost/Bakery/api/products.php?id=${productId}`
    );
    const product = await res.json();

    const {
      id,
      name,
      description,
      price,
      image,
      quantity,
      ingredients,
      offers,
      rate,
      category_name,
    } = product;

    document.title = name;
    // Generate the product HTML
    let imagesHtml = "";
    let dotsHtml = "";

    image
      .slice()
      .reverse()
      .forEach((imgSrc, index) => {
        imagesHtml += `<img src="${imgSrc}" alt="product-${
          image.length - index
        }" class="${index === 0 ? "active" : ""}">`;
        dotsHtml += `<button data-index="${index}" class="dot ${
          index === 0 ? "active" : ""
        }">
        <img src="${imgSrc}" alt="dot-${image.length - index}">
      </button>`;
      });

    const productHtml = `
      <div class="product-box">
        <div class="image-container">
          <div class="slider">${imagesHtml}</div>
          <div class="dots">${dotsHtml}</div>
        </div>

        <div class="details">
          <h1>${name}</h1>
          <h3>$${price}</h3>

          <div class="ingredients">
            <h4>Ingredients</h4>
            <p>${ingredients}</p>
          </div>
          <div class="description">
            <h4>Description</h4>
            <p>${description}</p>
          </div>
          <div class="quantity">
            <h4>Quantity</h4>
            <div class="quantity-buttons">
              <button class="decrease"><i class="fa-solid fa-minus"></i></button>
              <span class="quantity-display">0</span>
              <button class="increase"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span><i class="fa-solid fa-circle-${
              quantity > 0 ? "check" : "xmark"
            }"></i> 
            ${quantity > 0 ? "In stock" : "Out of stock"}</span>
          </div>

          <div class="buttons">
            <button class="add-to-cart">Add to Cart</button>
            <button><i class="fa-regular fa-heart"></i></button>
          </div>

          <div class="info">
            <p>Category: <span>${category_name}</span></p>
            <p>Chef Name: <span>Omar</span></p>
          </div>
        </div>
      </div>
    `;

    productContainer.innerHTML = productHtml;

    // Attach quantity update functionality
    attachQuantityHandlers(quantity);

    initializeSlider();

    // Attach add-to-cart functionality
    document
      .querySelector(".add-to-cart")
      .addEventListener("click", () => updateCart(product));
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

const attachQuantityHandlers = (maxQuantity) => {
  const quantityDisplay = document.querySelector(".quantity-display");
  const increaseButton = document.querySelector(".increase");
  const decreaseButton = document.querySelector(".decrease");

  // Get current quantity from localStorage if exists
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find((prd) => prd.id === productId);

  currentQuantity = existingProduct ? existingProduct.quantity : 0;
  quantityDisplay.textContent = currentQuantity;

  const showModal = () => {
    modal.classList.add("visible");
  };

  const closeModal = () => {
    modal.classList.remove("visible");
  };

  // Handle item removal
  modalConfirmButton.addEventListener("click", () => {
    const updatedCart = cart.filter((prd) => prd.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    currentQuantity = 0;
    quantityDisplay.textContent = currentQuantity;
    closeModal();
  });

  // Cancel item removal
  modalCancelButton.addEventListener("click", () => {
    currentQuantity = 1;
    quantityDisplay.textContent = currentQuantity;
    closeModal();
  });

  // Increase quantity
  increaseButton.addEventListener("click", () => {
    if (currentQuantity < maxQuantity) {
      currentQuantity++;
      quantityDisplay.textContent = currentQuantity;
    } else {
      alert("You have reached the maximum available quantity.");
    }
  });

  // Decrease quantity
  decreaseButton.addEventListener("click", () => {
    if (currentQuantity > 1) {
      currentQuantity--;
      quantityDisplay.textContent = currentQuantity;
    } else if (currentQuantity === 1 && existingProduct) {
      // Show confirmation modal to remove the item
      showModal();
    }
  });
};

const updateCart = (product) => {
  try {
    const { id, name, ingredients, price, image: images } = product;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((prd) => prd.id === id);

    if (currentQuantity > 0) {
      // Ensure quantity is greater than 0
      if (existingProduct) {
        existingProduct.quantity = currentQuantity;
        alert(`${name} has been updated in your cart!`);
      } else {
        const image = images[images.length - 1];
        const newProduct = {
          id,
          name,
          ingredients,
          price,
          image,
          quantity: currentQuantity,
        };
        cart.push(newProduct);
        alert(`${name} has been added to your cart!`);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("Please select a valid quantity before adding to the cart.");
    }
  } catch (err) {
    console.error("Product wasn't added to your cart:", err);
    alert("An error occurred while adding the product to your cart.");
  }
};

const initializeSlider = () => {
  const images = document.querySelectorAll(".slider img");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  const updateSlider = (index) => {
    images.forEach((img) => img.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    images[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"), 10);
      updateSlider(index);
    });
  });
};

getProduct();
