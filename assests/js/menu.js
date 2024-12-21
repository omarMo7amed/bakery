"use strict";

const productsContainer = document.querySelector(".products-container");
const paginationContainer = document.querySelector(".box-pagination");
const infoElement = document.querySelector(".info");
const sortDropdown = document.querySelector(".sort-by");
const categories = document.querySelector(".categories");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close-modal");

// console.log(closeModalButton);

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 8;

const isAdmin = function () {};

// modal functions
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

const closeModal = () => {
  overlay.classList.remove("active");
  modal.classList.remove("active");
};

const setupModalEvents = () => {
  closeModalButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
};

// getProducts
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost/Bakery/api/products.php");
    if (!response.ok) throw new Error("Failed to fetch products");

    allProducts = await response.json();
    filteredProducts = allProducts;
    renderProducts();
    renderPagination();
    updateInfo();
  } catch (error) {
    console.error(error.message);
  }
};

// Render products
const renderProducts = () => {
  productsContainer.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = Math.min(start + productsPerPage, filteredProducts.length);
  const productsToDisplay = filteredProducts.slice(start, end);

  if (productsToDisplay.length === 0) {
    productsContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  productsToDisplay.forEach((product) => {
    const productImage = product.image[product.image.length - 1];
    const productHTML = `
        <li class="product" data-id="${product.id}">
          <img src="${productImage}" class='image' alt="${product.name}">
          <div class="text">
            <p class="name">${product.name}</p>
            <span class="category">${product.category_name}</span>
            <p class="price">$${product.price}</p>
          </div>
          <ul class="product-options">
            <li class="info" title="View Details"><i class="fa-solid fa-info"></i></li>
            <li class="add-to-wishlist"><i class="fa-regular fa-heart"></i></li>
            <li class="add-to-cart"><i class="fa-solid fa-cart-shopping"></i></li>   
          </ul>
        </li>`;
    productsContainer.insertAdjacentHTML("beforeend", productHTML);
  });
};

// Render pagination
const renderPagination = () => {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageHTML = `
        <li class="dot ${i === currentPage ? "active" : ""}" data-page="${i}">
          ${i}
        </li>`;
    paginationContainer.insertAdjacentHTML("beforeend", pageHTML);
  }

  paginationContainer.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      currentPage = parseInt(dot.dataset.page, 10);
      renderProducts();
      renderPagination();
      updateInfo();
    });
  });
};

// update information text
const updateInfo = () => {
  const start = (currentPage - 1) * productsPerPage + 1;

  infoElement.textContent = `Showing ${start} of ${filteredProducts.length} results`;
};

// sorting products
const sortProducts = (criteria) => {
  const url = new URL(window.location);
  url.searchParams.set("sortby", criteria);
  window.history.pushState({}, "", url);

  switch (criteria) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  currentPage = 1;
  renderProducts();
  renderPagination();
  updateInfo();
};

// filtering by category
const filterByCategory = (category) => {
  filteredProducts =
    category === "All"
      ? allProducts
      : allProducts.filter((product) => product.category_name === category);

  currentPage = 1;
  renderProducts();
  renderPagination();
  updateInfo();
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

// Event listeners
const setupEvents = () => {
  sortDropdown.addEventListener("click", () =>
    sortDropdown.classList.toggle("active")
  );

  sortDropdown.querySelectorAll(".options li").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      sortDropdown.querySelector(".selected").textContent = option.textContent;
      sortDropdown.classList.remove("active");
      sortProducts(value);
    });
  });

  categories.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const categoryName = e.target.textContent;
      const url = new URL(window.location);
      url.searchParams.set("category", categoryName);
      window.history.pushState({}, "", url);
      categories.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");
      filterByCategory(categoryName);
    }
  });

  //show modal
  productsContainer.addEventListener("click", (e) => {
    const infoIcon = e.target.closest(".info");
    console.log(infoIcon);
    if (!infoIcon) return;

    const productId = infoIcon.closest(".product").dataset.id;
    fetch(`http://localhost/Bakery/api/products.php?id=${productId}`)
      .then((res) => res.json())
      .then((product) => showModal(product))
      .catch((err) => console.error("Failed to fetch product details:", err));
  });

  //navigate to productPage by id
  productsContainer.addEventListener("click", (e) => {
    const productID = e.target.closest(".product").getAttribute("data-id");

    if (e.target.closest(".image")) {
      const url = new URL(window.location);
      url.searchParams.set("id", productID);
      window.history.pushState({}, "", url);
      const newPath = `/Bakery/product?id=${productID}`;

      window.location.href = newPath;
    }
  });

  productsContainer.addEventListener("click", handleAddToCart);
};

// Initialize
const initialize = () => {
  setupModalEvents();
  setupEvents();
  fetchProducts();
};

initialize();
