<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bakery Form</title>
    <link rel="stylesheet" href="./assests/css/order.css" />
    <link rel="icon" type="image/webp" href="Images/icon.webp" />
    <link rel="stylesheet" href="./assests/css/footer.css" />
    <link rel="stylesheet" href="./assests/css/header.css" />
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
    <div class="container">

        <div class="order-container">
            <h1>Ready to order? Let's go!</h1>
            <form action="">
                <div class="group-input">
                    <label for="name">name</label>
                    <input class="input-field" type="text" id="name" required>
                </div>
                <div class="group-input">
                    <label for="phoneNumber">phone number</label>
                    <input class="input-field" type="text" id="phoneNumber" required>
                </div>
                <div class="group-input">
                    <label for="address">Address</label>
                    <input class="input-field" type="text" id="address" required >
                </div>
                <button class="btn-submit" type="submit"><span class="price">Price</span> Order Now</button>
            </form>
        </div>
    </div>

</div>
<?php include('../components/footer.php')?>
<script src="./assests/js/header.js" defer></script>
    <script src="./assests/js/order.js" defer></script>
</body>
</html>
