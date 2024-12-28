
<?php 

// require_once '../helpers/helper.php';
//  if(!isAuthenticated()){
//   header('Location: login');
//   return null;
//  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>order</title>
    <link rel="stylesheet" href="./assests/css/newOrder.css">
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
<div class="order-page">

    <div class="order-summary">
        <div class="special-text">
            <h1>Order Summary</h1>
            <img src="Images/heading-separate.webp" alt="separator" />
        </div>
        <div id="user-info" class="info-section"></div>
        <div id="product-list" class="info-section"></div>
        <div id="total-price" class="info-section"></div>
      </div>
</div>

  <?php include('../components/footer.php')?>

    <script src="./assests/js/newOrder.js" defer></script> 
    <script src="./assests/js/header.js" defer></script>
</body>

</html>