<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zebda W Zaatar | Cart</title>
    <link rel="stylesheet" href="./assests/css/footer.css" />
  <link rel="stylesheet" href="./assests/css/header.css" />
  <link rel="stylesheet" href="./assests/css/cart.css">
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
  <?php include('../components/header.php') ?>

<div class="cart-page">
    <h1 class="page-title">Your Cart</h1>
    <div class="cart-container">
      <div class="cart-items">
        <div class="cart-item">
          <img src="./assests/images/products/single-product-01.webp" alt="Bread" class="item-image">
          <div class="item-details">
            <h3 class="item-name">Artisan Bread</h3>
            <p class="item-price">$5.00</p>
            <p class="ingredients">
            Ingredients:  Flour, butter, yeast, salt
            </p>
          </div>
        <div class="item-controls">
          <p class="item-quantity">x 5</p>
            <div class="quantity">
              <button class="qty-btn decrement"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-value">1</span>
              <button class="qty-btn increment"><i class="fa-solid fa-plus"></i></button>
            </div>
              <button class="remove-item"><i class="fas fa-trash-alt"></i></button>
        </div>
    </div>
      </div>

      <div class="empty-cart-message" style="display: none;">
  <h2>Your cart is empty!</h2>
  <p>Why not explore our menu to add some delicious items?</p>
  <a href="/bakery/menu" class="go-to-menu-button">Go to Menu</a>
</div>

      <div class="cart-summary">
        <div class="cart-details">
          <h2>Order Summary</h2>
          <div class="summary-item">
            <span>Subtotal</span>
            <span class="subtotal-price">$15.00</span>
          </div>
          <div class="summary-item">
            <span>Tax (10%)</span>
            <span class="tax-price">$1.50</span>
          </div>
          <div class="summary-item total">
            <span>Total</span>
            <span class="total-price">$16.50</span>
          </div>
        </div>
          <button class="checkout-btn">Checkout</button>
       </div>

<!-- Modal to remove item -->
  <div class="confirmation-modal">
  <div class="modal-content">
    <h3>Are you sure you want to remove this item?</h3>
    <button class="modal-confirm">Remove</button>
    <button class="modal-cancel">Cancel</button>
  </div>
</div>
<!-- Empty cart -->



    </div>
  </div>

  <?php include('../components/footer.php') ?>

  <script src="./assests/js/cart.js" defer></script>
  <script src="./assests/js/header.js" defer></script>

</body>
</html>