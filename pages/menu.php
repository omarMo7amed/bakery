<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zebda W Zaatar | Menu</title>
  <link rel="stylesheet" href="./assests/css/menu.css">
  <link rel="stylesheet" href="./assests/css/footer.css" />
  <link rel="stylesheet" href="./assests/css/header.css" />
  <link rel="icon" type="image/webp" href="Images/icon.webp" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre:wght@600..700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      rel="stylesheet"
    />
</head>
<body>

<?php include('../components/header.php')?>

<div class="menu">
    <div class="container">
        <div class="menu-content">
            <img src="./Images/icon.webp"  class="menu-logo" alt="Logo">
            <div class="text">
                <h1>Our Menu</h1>
                <img src="Images/heading-separate.webp" alt="separator" />
            </div>
            <p>We pride ourselves on offering a unique culinary journey, blending flavors to delight both local and international guests. Each visit promises an unforgettable dining experience crafted with passion and care.</p>

        </div>
        <ul class="categories">
            <li class="active">All</li>
            <li>Bread</li>
            <li>Cookies</li>
            <li>Cupcakes</li>
            <li>Cake</li>
        </ul>
    </div>
</div>

<!-- Products -->
<div class="products">
  <div class="container">
    <div class="bar-operations">
      <div class="info">Showing number results of total</div>
      <div class="sort-by" role="select" tabindex="0">
        <span class="selected">Sort By</span>
        <ul class="options">
          <li data-value="price-asc">Price: Low to High</li>
          <li data-value="price-desc">Price: High to Low</li>
          <li data-value="name-asc">Name: A to Z</li>
          <li data-value="name-desc">Name: Z to A</li>
        </ul>
      </div>
    </div>

    <ul class="products-container"></ul>
    <div class="overlay"></div>
        <div class="modal">
           <button class="close-modal">&times;</button>
           <div class="product-view">
            <img
              class="modal-image"
              src="Images/single-product-01.webp"
              alt="Product Image"
            />
            <div class="product-details">
                <h2 class="modal-title">Product Name</h2>
                <p class="modal-description">Description of the product.</p>
                <p class="modal-ingredients">Ingredients: Example Ingredients</p>
            </div>
          </div>
        </div>

      </div>
      <div class="pagination">
              <ul class="box-pagination">
                  <li class="dot active">1</li>
                  <li class="dot">2</li>
                  <li class="dot">3</li>
              </ul>
      </div>
</div>

    
<?php include('../components/footer.php')?>

  <script src="./assests/js/menu.js" defer></script>
  <script src="./assests/js/header.js" defer></script>

</body>
</html>
