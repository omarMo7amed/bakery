"use strict";

const url = new URL(window.location);
const order_id = url.searchParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  const userInfoDiv = document.getElementById("user-info");
  const productListDiv = document.getElementById("product-list");
  const totalPriceDiv = document.getElementById("total-price");

  try {
    const res = await fetch(
      `http://localhost/Bakery/api/orders.php?orderId=${order_id}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch order data: ${res.statusText}`);
    }

    const { username, phone_number, address, products, total_price } =
      await res.json();

    userInfoDiv.innerHTML = `
      <h2>User Information</h2>
      <p><strong>Name:</strong> ${username}</p>
      <p><strong>Phone:</strong> ${phone_number}</p>
      <p><strong>Address:</strong> ${address}</p>
    `;

    const productsHTML = products
      .map(
        (product) => `
        <div class="product">
          <div class="product-info">
            <img src="${product.image[product.image.length - 1]}" alt="${
          product.product_name
        }" />
            <span class="product-name">${product.product_name}</span>
            <span> (x${product.quantity})</span>
          </div>
          <div class="price">$${(product.quantity * product.price).toFixed(
            2
          )}</div>
        </div>
      `
      )
      .join("");

    productListDiv.innerHTML = `<h2>Products</h2>${productsHTML}`;

    totalPriceDiv.innerHTML = `<h2>Total Price</h2><p>$${total_price.toFixed(
      2
    )}</p>`;
  } catch (error) {
    window.location.href = "http://localhost/Bakery/payment";
    console.log(error);
  }
});
