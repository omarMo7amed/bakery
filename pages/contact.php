<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zebda W Zaatar | Contact Us</title>
  <link rel="stylesheet" href="./assests/css/contact.css">
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    rel="stylesheet"
  />
  <link rel="icon" type="image/webp" href="Images/icon.webp" />
</head>
<body>
  <div class="contact-container">
    <h1 class="contact-title">Contact Us</h1>
    <p class="contact-subtitle">We’d love to hear from you! Reach out to us for any queries or feedback.</p>
    
    <div class="contact-content">
      <!-- Contact Form -->
      <form class="contact-form" id="contactForm" action="#" method="POST">
        <div class="input-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" required>
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required>
        </div>
        <div class="input-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Write your message here" rows="4" required></textarea>
        </div>
        <div class="buttons">
            <a href="index.php" class="back-btn">Go to Home</a>
            <button type="submit" class="send-btn">
                <i class="fas fa-paper-plane"></i> Send Message
            </button>
        </div>
      </form>

      <!-- Image -->
      <div class="contact-info"> </div>
    </div>
  </div>
</body>
</html>
