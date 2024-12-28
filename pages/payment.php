<?php 
require_once '../helpers/helper.php';
 if(!isAuthenticated()){
  header('Location: login');
  return null;
 }

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zebda W Zaatar | Payment</title>
  <link rel="stylesheet" href="./assests/css/payment.css">
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

  <div class="payment-page">
    <div class="payment-container">
      <h1>Payment Details</h1>
      <form id="paymentForm">
        <div class="input-group">
          <label for="name_on_card">Name on Card</label>
          <input type="text" id="name_on_card" placeholder="John Doe" required>
        </div>
        <div class="input-group">
          <label for="card_name">Card Number</label>
          <input type="text" id="card_name" placeholder="1234 5678 9012 3456" maxlength="16" required>
        </div>
        <div class="input-group">
          <label for="cvv">CVV</label>
          <input type="text" id="cvv" placeholder="123" maxlength="3" required>
        </div>
        <button type="submit" class="btn-submit">Pay Now</button>
      </form>
    </div>
  </div>
<?php include('../components/footer.php')?>

    <script src="./assests/js/payment.js" defer></script> 
    <script src="./assests/js/header.js" defer></script>
  </body>
  </html>
