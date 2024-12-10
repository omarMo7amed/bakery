"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelector(".cartItem .cart-quantity");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length) {
    cart.classList.add("cart-quantity-active");
    cart.textContent = cartItems.length;
  }
});
