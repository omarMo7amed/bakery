"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const subtotalPrice = document.querySelector(".subtotal-price");
  const taxPrice = document.querySelector(".tax-price");
  const totalPrice = document.querySelector(".total-price");
  const modal = document.querySelector(".confirmation-modal");
  const modalConfirmButton = document.querySelector(".modal-confirm");
  const modalCancelButton = document.querySelector(".modal-cancel");
  const checkoutButton = document.querySelector(".checkout-btn");
  let itemToRemoveIndex = null;
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  const checkIfCartIsEmpty = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const emptyCartMessage = document.querySelector(".empty-cart-message");

    if (cartData.length === 0) {
      cartContainer.style.display = "none";
      emptyCartMessage.style.display = "flex";
    } else {
      cartContainer.style.display = "flex";
      emptyCartMessage.style.display = "none";
    }
  };

  const getProductData = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost/Bakery/api/products.php?id=${productId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch product data", error);
      return null;
    }
  };

  // Load cart data from localStorage
  // Update loadCartFromLocalStorage to include checkIfCartIsEmpty
  const loadCartFromLocalStorage = () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    cartData.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="item-image">
      <div class="item-details">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-price">$${item.price.toFixed(2)}</p>
        <p class="ingredients">Ingredients: ${item.ingredients}</p>
      </div>
      <div class="item-controls">
        <p class="item-quantity">x ${item.quantity}</p>
        <div class="quantity">
          <button class="qty-btn decrement"><i class="fa-solid fa-minus"></i></button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn increment"><i class="fa-solid fa-plus"></i></button>
        </div>
        <button class="remove-item"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;

      cartContainer.appendChild(cartItem);

      setupEventListeners(index, item);
    });

    updateTotal();
    checkIfCartIsEmpty(); // Check if cart is empty after loading items
  };

  // Update total prices
  const updateTotal = () => {
    let subtotal = 0;

    document.querySelectorAll(".cart-item").forEach((item) => {
      const price = parseFloat(
        item.querySelector(".item-price").textContent.replace("$", "")
      );
      const qty = parseInt(item.querySelector(".qty-value").textContent);
      subtotal += price * qty;
    });

    const tax = subtotal * 0.1;
    subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
    taxPrice.textContent = `$${tax.toFixed(2)}`;
    totalPrice.textContent = `$${(subtotal + tax).toFixed(2)}`;
  };

  // Event listeners for increment/decrement
  const setupEventListeners = async (index, item) => {
    const qtyValue = document.querySelectorAll(".qty-value")[index];

    // Fetch the product data
    const productData = await getProductData(item.id);

    document
      .querySelectorAll(".decrement")
      [index].addEventListener("click", () => {
        if (parseInt(qtyValue.textContent) > 1) {
          qtyValue.textContent--;
          item.quantity--;
          updateCart(item);
          updateTotal();
        } else {
          itemToRemoveIndex = index;
          showModal();
        }
        loadCartFromLocalStorage();
      });

    document
      .querySelectorAll(".increment")
      [index].addEventListener("click", async () => {
        if (productData && item.quantity < productData.quantity) {
          qtyValue.textContent++;
          item.quantity++;
          updateCart(item);
          updateTotal();
        } else {
          alert("This is the max number you can order.");
        }
        loadCartFromLocalStorage();
      });

    document
      .querySelectorAll(".remove-item")
      [index].addEventListener("click", () => {
        itemToRemoveIndex = index;
        showModal();
      });
  };

  // Update cart data in localStorage
  const updateCart = (item) => {
    const updatedCartData = cartData.map((cartItem) =>
      cartItem.id === item.id ? item : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };

  // Show confirmation modal
  const showModal = () => {
    modal.classList.add("visible");
  };

  // Close confirmation modal
  const closeModal = () => {
    modal.classList.remove("visible");
  };

  //navigate to login or order form
  checkoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    const price = parseFloat(totalPrice.textContent.replace("$", ""));
    localStorage.setItem(
      "order",
      JSON.stringify({ totalPrice: price, cartData })
    );

    window.location.href = "http://localhost/Bakery/order";
  });

  // Handle item removal
  modalConfirmButton.addEventListener("click", () => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    cartData.splice(itemToRemoveIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cartData));
    loadCartFromLocalStorage();
    closeModal();
  });

  // Cancel item removal
  modalCancelButton.addEventListener("click", () => {
    closeModal();
  });

  // Initial load
  loadCartFromLocalStorage();
});

// const cart = JSON.parse(localStorage.setItem("cart"));

// const x = [{ userName, phone, address, cart }];
