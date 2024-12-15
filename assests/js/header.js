"use strict";

const BASE_URL = "http://localhost/Bakery/api/users/logout.php";

document.addEventListener("DOMContentLoaded", () => {
  const cart = document.querySelector(".cartItem .cart-quantity");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const loginButton = document.querySelector(".login-button");
  const menuIcon = document.querySelector(".menu-icon");
  const overlay = document.querySelector(".overlay");
  const navItems = document.querySelector(".items");

  menuIcon.addEventListener("click", (e) => {
    e.preventDefault();
    navItems.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    navItems.classList.remove("active");
    overlay.classList.remove("active");
  });

  if (cartItems.length) {
    cart.classList.add("cart-quantity-active");
    cart.textContent = cartItems.length;
  }

  const isAuthenticated = document.cookie.includes("auth_token");

  if (isAuthenticated) {
    loginButton.innerHTML = `<a href="#" id="logout-button"><i class='fas fa-sign-out-alt'></i> Logout</a>`;
    const logoutButton = document.getElementById("logout-button");

    // Logout functionality
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(BASE_URL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.success || "Logged out successfully");
          window.location.href = "index.php";
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred during logout");
        });
    });
  } else {
    loginButton.innerHTML = `<a href='login'><i class='fas fa-sign-in-alt'></i> Login</a>`;
  }
});
