"use strict";
const PAYMENT_URL = "http://localhost/Bakery/api/payments.php";
const ORDER_URL = "http://localhost/Bakery/api/orders.php";

document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");
  const orderData = JSON.parse(localStorage.getItem("order")) || {};

  // Redirect if orderData is invalid
  if (!orderData.hasOwnProperty("name")) {
    window.location.href = "http://localhost/Bakery/order";
    return;
  }

  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const card_number = document.getElementById("card_name").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const name_on_card = document.getElementById("name_on_card").value.trim();

    // Validation
    if (!/^\d{16}$/.test(card_number)) {
      alert("Invalid card number. It must be 16 digits.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("Invalid CVV. It must be 3 digits.");
      return;
    }

    if (name_on_card.length === 0) {
      alert("Name on card cannot be empty.");
      return;
    }

    const paymentData = {
      card_number,
      cvv,
      name_on_card,
    };

    try {
      // First request: Payment
      const paymentRes = await fetch(PAYMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!paymentRes.ok) {
        const paymentError = await paymentRes.text();
        alert("Failed to process the payment. Please try again.");
        console.error("Payment Error Response:", paymentError);
        return;
      }

      const paymentResponseData = await paymentRes.json();
      console.log("Payment Response:", paymentResponseData);

      // Second request: Order
      const orderRes = await fetch(ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderRes.ok) {
        const { error } = await orderRes.text();

        console.error("Order Error Response:", error);
        return;
      }

      const { error, order_id } = await orderRes.json();

      if (error) return alert("Failed to submit the order. Please try again.");

      console.log("Order Response:", order_id);

      alert("Payment and Order submitted successfully!");

      localStorage.clear();
      paymentForm.reset();

      window.location.href = `http://localhost/Bakery/newOrder?id=${order_id}`;
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the payment or order.");
    }
  });
});
