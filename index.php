<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zebda W Zaatar</title>
    <link rel="icon" type="image/webp" href="Images/icon.webp" />
    <link
      rel="preload"
      href="./assests/css/global-style.css"
      as="style"
      onload="this.rel='stylesheet'"
    />
    <link
      rel="preload"
     href="./assests/css/header.css"
      as="style"
      onload="this.rel='stylesheet'"
    />
    <link
      rel="preload"
      href="./assests/css/hero-section.css"
      as="style"
      onload="this.rel='stylesheet'"
    />
    <link rel="preload" href="Images/slider-1.webp" as="image" />

    <link rel="stylesheet" href="./assests/css/about.css" />
    <link rel="stylesheet" href="./assests/css/best-seller.css" />
    <link rel="stylesheet" href="./assests/css/footer.css" />
    <link rel="stylesheet" href="./assests/css/special-service.css" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      rel="stylesheet"
    />
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
    <!-- Header -->
  <?php include('./components/header.php')?>

    <!-- All content -->
    <div id="root">
      <!-- Hero Section -->
   <?php include('./components/heroSection.php') ?>
      <!-- About Section -->
   <?php include('./components/about.php') ?>
      <!-- Best Seller Section -->
   <?php include('./components/bestProducts.php') ?>
      <!-- Special Service Section -->
   <?php include('./components/specialServices.php') ?>
    </div>
    
   <!-- Footer -->
  <?php include('./components/footer.php') ?>
  

    <script src="./assests/js/bestSeller.js" type="module" async></script>
    <script src="./assests/js/script.js" defer></script>
    <script src="./assests/js/header.js" defer></script>
  </body>
</html>
