"use strict";

const contentContainer = document.querySelector(".best-seller .content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close-modal");

const showModal = (product) => {
  const productImage = product.image[product.image.length - 1];

  modal.querySelector(".modal-image").src = productImage;
  modal.querySelector(".modal-image").alt = product.name;
  modal.querySelector(".modal-title").textContent = product.name;
  modal.querySelector(
    ".modal-ingredients"
  ).textContent = `Ingredients: ${product.ingredients}`;
  modal.querySelector(".modal-description").textContent =
    product.description.split(" ").slice(0, 10).join(" ") + "...";

  overlay.classList.add("active");
  modal.classList.add("active");
};

// Close modal
const closeModal = () => {
  overlay.classList.remove("active");
  modal.classList.remove("active");
};

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost/Bakery/api/products.php");

    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const data = await response.json();
    renderTopRatedProducts(data);
  } catch (error) {
    console.error(error.message);
  }
};

const renderTopRatedProducts = (products) => {
  const topRatedProducts = products
    ?.sort((a, b) => b.rate - a.rate)
    .slice(0, 5);

  if (!topRatedProducts.length)
    return contentContainer.insertAdjacentHTML(
      "beforeend",
      "<p style='text-align: center; color: var(--paragraph-color)'>No Products found</p>"
    );

  topRatedProducts.forEach((product) => {
    const productImage = product.image[product.image.length - 1];

    const productHTML = `
      <div class="product" data-id="${product.id}">
        <img src="${productImage}" class='image' alt="${product.name}" />
        <div class="text">
          <p class="name">${product.name}</p>
          <span class="category">${product.category_name}</span>
          <p class="price">$${product.price}</p>
        </div>
        <ul class="product-options">
          <li class="info" title="View Details">
            <i class="fa-solid fa-info"></i>
          </li>
          <li title="Add to Wishlist">
            <i class="fa-regular fa-heart"></i>
          </li>
          <li class="add-to-cart" title="Add to Cart">
            <i class="fa-solid fa-cart-shopping"></i>
          </li>
        </ul>
      </div>
    `;
    contentContainer.insertAdjacentHTML("beforeend", productHTML);
  });
};

// Event Handlers
const handleProductClick = (e) => {
  const infoIcon = e.target.closest(".info");
  if (!infoIcon) return;

  const productElement = infoIcon.closest(".product");
  const productId = productElement.dataset.id;

  fetch(`http://localhost/Bakery/api/products.php?id=${productId}`)
    .then((res) => res.json())
    .then((product) => showModal(product))
    .catch((err) => console.error("Failed to fetch product details:", err));
};

const handleAddToCart = (e) => {
  // Find the closest add-to-cart button
  const addToCartIcon = e.target.closest(".add-to-cart");
  if (!addToCartIcon) return;

  // Get the product ID from the dataset
  const productElement = addToCartIcon.closest(".product");
  const productId = productElement?.dataset.id;
  if (!productId) return;

  // Fetch product details
  fetch(`http://localhost/Bakery/api/products.php?id=${productId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch product details");
      return res.json();
    })
    .then((prd) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const image = prd.image[prd.image.length - 1];
      const { name, id, ingredients, price } = prd;

      const existingProduct = cart.find((item) => item.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        alert(
          `${existingProduct.name}'s quantity has been updated in your cart!`
        );
      } else {
        const product = { name, id, ingredients, price, image, quantity: 1 };
        cart.push(product);
        alert(`${product.name} has been added to your cart!`);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    })
    .catch((err) => console.error("Failed to fetch product details:", err));
};

const handleKeydown = (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

const handleOverlayClick = (e) => {
  if (e.target === overlay) {
    closeModal();
  }
};

// Initialize
fetchProducts();

contentContainer.addEventListener("click", handleProductClick);
contentContainer.addEventListener("click", handleAddToCart);
closeModalButton.addEventListener("click", closeModal);
document.addEventListener("keydown", handleKeydown);
overlay.addEventListener("click", handleOverlayClick);

// Redirect logic for image click
contentContainer.addEventListener("click", (e) => {
  const productID = e.target.closest(".product")?.getAttribute("data-id");

  if (e.target.closest(".image")) {
    const url = new URL(window.location);
    url.searchParams.set("id", productID);
    window.history.pushState({}, "", url);
    const newPath = `/Bakery/product?id=${productID}`;

    window.location.href = newPath;
  }
});
