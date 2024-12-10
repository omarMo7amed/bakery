"use strict";
//temp
const orderData = {
  username: "amr test 3",
  phone_number: "01204562326",
  address: "banha banha monofia",
  total_price: 232,
  products: [
    {
      product_id: 1,
      product_name: "Whole Wheat Bread",
      image: [
        "./assests/images/products/single-product-05.webp",
        "./assests/images/products/single-product-05.webp",
      ],
      quantity: 2,
      price: 28.2,
    },
    {
      product_id: 2,
      image: [
        "./assests/images/products/single-product-05.webp",
        "./assests/images/products/single-product-05.webp",
      ],
      product_name: "Chocolate Cake",
      quantity: 2,
      price: 25,
    },
    {
      product_id: 3,
      image: [
        "./assests/images/products/single-product-05.webp",
        "./assests/images/products/single-product-05.webp",
      ],
      product_name: "Croissant",
      quantity: 3,
      price: 20,
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  const userInfoDiv = document.getElementById("user-info");
  const productListDiv = document.getElementById("product-list");
  const totalPriceDiv = document.getElementById("total-price");

  userInfoDiv.innerHTML = `
    <h2>User Information</h2>
    <p><strong>Name:</strong> ${orderData.username}</p>
    <p><strong>Phone:</strong> ${orderData.phone_number}</p>
    <p><strong>Address:</strong> ${orderData.address}</p>
  `;

  const productsHTML = orderData.products
    .map(
      (product) => `
      <div class="product">
        <div class='product-info'>
        <img src=${product.image[product.image.length - 1]} alt=${
        product.product_name
      }
          <span class="product-name">${product.product_name}</span>
          <span> (x${product.quantity})</span>
        </div>
        <div class='price'>$${(product.quantity * product.price).toFixed(
          2
        )}</div>
      </div>
    `
    )
    .join("");

  productListDiv.innerHTML = `<h2>Products</h2>${productsHTML}`;

  totalPriceDiv.innerHTML = `<h2>Total Price</h2><p>$${orderData.total_price.toFixed(
    2
  )}</p>`;
});
