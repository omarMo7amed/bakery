"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".btn-submit");
  const price = document.querySelector(".btn-submit .price");
  const orderData = JSON.parse(localStorage.getItem("order"));

  price.textContent = `$${orderData.totalPrice}`;

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!/^\d+$/.test(phoneNumber)) {
      alert("Phone number is not valid. Please enter only digits.");
      return;
    }

    const orderDetails = { name, phoneNumber, address, ...orderData };

    if (!Object.keys(orderDetails).length) {
      alert("your cart is empty");
      return;
    }

    localStorage.setItem("order", JSON.stringify(orderDetails));

    window.location.href = "http://localhost/Bakery/payment";
  });
});
