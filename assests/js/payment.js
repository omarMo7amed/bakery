"use strict";

const BASE_URL = "http://localhost/Bakery/api/payments.php";

document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");

  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const card_number = document.getElementById("card_name").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    const name_on_card = document.getElementById("name_on_card").value.trim();

    // if (!/^\d{16}$/.test(cardNumber)) {
    //   alert("Invalid card number. It must be 16 digits.");
    //   return;
    // }

    // if (!/^\d{3}$/.test(cvv)) {
    //   alert("Invalid CVV. It must be 3 digits.");
    //   return;
    // }

    // if (nameOnCard.length === 0) {
    //   alert("Name on card cannot be empty.");
    //   return;
    // }

    const paymentData = {
      card_number,
      cvv,
      name_on_card,
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      console.log(res.ok);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert("Payment Successful!");

        localStorage.clear();

        paymentForm.reset();
      } else {
        const errorText = await res.text();
        alert("Failed to process the payment. Please try again.");
        console.error("Error Response:", errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the payment.");
    }
    window.location.href = "http://localhost/Bakery/newOrder";
  });
});
