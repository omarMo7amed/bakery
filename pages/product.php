<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prdouct</title>
    <link rel="stylesheet" href="./assests/css/product.css" />
    <link rel="icon" type="image/webp" href="Images/icon.webp" />
    <link
      rel="preload"
      href="./assests/css/header.css"
      as="style"
      onload="this.rel='stylesheet'"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./assests/css/footer.css" />
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
  </head>
  <body>
    <?php include('../components/header.php')?>

    <div class="product-container">
      <div class="product-box">
        <div class="image-container">
          <div class="slider">
            <img
              src="./assests/images/single-product-04.webp"
              alt="product-1"
              class="active"
            />
            <img
              src="./assests/images/single-product-05.webp"
              alt="product-2"
            />
            <img
              src="./assests/images/single-product-06.webp"
              alt="product-3"
            />
          </div>
          <div class="dots">
            <button data-index="0" class="dot active">
              <img src="./assests/images/single-product-04.webp" alt="dot-1" />
            </button>
            <button data-index="1" class="dot">
              <img src="./assests/images/single-product-05.webp" alt="dot-2" />
            </button>
            <button data-index="2" class="dot">
              <img src="./assests/images/single-product-06.webp" alt="dot-3" />
            </button>
          </div>
        </div>

        <div class="details">
          <h1>Name of Product</h1>
          <h3>price</h3>

          <div class="ingredients">
            <h4>Ingredients</h4>
            <p>details</p>
          </div>
          <div class="description">
            <h4>description</h4>
            <p>details</p>
          </div>
          <div class="quantity">
            <h4>Quantity</h4>

            <div class="quantity-buttons">
              <button><i class="fa-solid fa-minus"></i></button>
              <span>0</span>
              <button><i class="fa-solid fa-plus"></i></button>
            </div>

            <span
              ><i class="fa-solid fa-circle-check"></i>
              <!-- <i class="fa-solid fa-circle-xmark"></i> -->
              instock</span
            >
          </div>

          <div class="buttons">
            <button class="add-to-cart">Add to Card</button>
            <button>
              <i class="fa-regular fa-heart"></i>
              <!-- <i class="fa-solid fa-heart"></i> -->
            </button>
          </div>

          <div class="info">
            <p>Category : <span> Category </span></p>
            <p>Cheif Name : <span> Omar</span></p>
          </div>
       
        </div>
      </div>
    </div>

        <!-- Modal to remove item -->
        <div class="confirmation-modal">
            <div class="modal-content">
              <h3>Are you sure you want to remove this item from the cart?</h3>
              <button class="modal-confirm">Remove</button>
              <button class="modal-cancel">Cancel</button>
            </div>
          </div>

    <?php include('../components/footer.php') ?>
    <script src="./assests/js/product.js"></script>
    <script src="./assests/js/header.js" defer></script>
  </body>
</html>
