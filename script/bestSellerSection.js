const contentContainer = document.querySelector(".best-seller .content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Temp data
const products = [
  {
    name: "Plain Croissant",
    category: "Pastry",
    price: "$2.50",
    image: "Images/single-product-01.webp",
    ingredients: "Flour, Butter, Sugar, Yeast, Milk",
    description: "A buttery and flaky pastry perfect for breakfast or snacks.",
  },
  {
    name: "Baguette",
    category: "Bread",
    price: "$3.00",
    image: "Images/single-product-02.webp",
    ingredients: "Flour, Water, Yeast, Salt",
    description:
      "A classic French bread with a crispy crust and soft interior.",
  },
  {
    name: "Madeleine",
    category: "Pastry",
    price: "$1.50",
    image: "Images/single-product-03.webp",
    ingredients: "Flour, Sugar, Eggs, Butter, Lemon Zest",
    description: "Soft and spongy, these little cakes are a delightful treat.",
  },
  {
    name: "Chocolate Croissant",
    category: "Pastry",
    price: "$3.50",
    image: "Images/single-product-04.webp",
    ingredients: "Flour, Butter, Chocolate, Sugar, Yeast, Milk",
    description: "A rich, chocolate-filled delight for sweet lovers.",
  },
  {
    name: "Pain de Campagne",
    category: "Bread",
    price: "$4.00",
    image: "Images/single-product-05.webp",
    ingredients: "Flour, Water, Yeast, Salt, Sourdough Starter",
    description: "A rustic French country bread with a hearty flavor.",
  },
];

products.forEach((product, index) => {
  const productHTML = `
    <div class="product" data-index="${index}">
      <img src="${product.image}" alt="${product.name}" />
      <div class="text">
        <p class="name">${product.name}</p>
        <span class="category">${product.category}</span>
        <p class="price">${product.price}</p>
      </div>
      <ul class="product-options">
        <li class="info" title="View Details"><i class="fa-solid fa-info"></i></li>
        <li title="Add to Wishlist"><i class="fa-regular fa-heart"></i></li>
        <li title="Add to Cart"><i class="fa-solid fa-cart-shopping"></i></li>
      </ul>
    </div>
  `;

  // Append the product to the container
  contentContainer.insertAdjacentHTML("beforeend", productHTML);
});

//  show the modal
contentContainer.addEventListener("click", (e) => {
  const infoIcon = e.target.closest(".info");
  if (!infoIcon) return;

  const productElement = infoIcon.closest(".product");
  const index = productElement.dataset.index;
  const item = products[index];

  // Populate the modal
  modal.querySelector(".modal-image").setAttribute("src", item.image);
  modal.querySelector(".modal-image").setAttribute("alt", item.name);
  modal.querySelector(".modal-title").textContent = item.name;
  modal.querySelector(
    ".modal-ingredients"
  ).textContent = `Ingredients: ${item.ingredients}`;
  modal.querySelector(".modal-description").textContent = item.description;

  // Show the modal
  overlay.classList.add("active");
  modal.classList.add("active");
});

// Function to close the modal
function closeModal() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}

document.querySelector(".close-modal").addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeModal();
  }
});
