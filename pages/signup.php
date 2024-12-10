<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/webp" href="Images/icon.webp" />
  <title>Zebda W Zaatar | Signup</title>
  <link rel="stylesheet" href="./assests/css/signup.css">
  <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      rel="stylesheet"
    />
</head>
<body>
  <div class="signup-container">
    <div class="signup-image">
      <div class="text">
        <h2>Create Your Account</h2>
        <p>Indulge in the sweetness of life! Sign up now to access exclusive offers.</p>
      </div>
      <img src="assests/images/signup.webp" alt="Delicious Pastries">
    </div>
    <form class="signup-form" id="signupForm" action="" method="POST">
      <div class="input-group">
        <div class ="name">
          <div >
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" placeholder="omar" required>
          </div>
          <div >
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" placeholder="mohamed" required>
          </div>
        </div>
      </div>
  
      <div class="input-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" placeholder="01112950811" required>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="example@domain.com" required>
      </div>

      <div class="input-group">
        <label for="address">Address</label>
        <input type="text" id="address" name="address" placeholder="cairo,street" required>
      </div>
      <div class="input-group">
              <label for="password">Password</label>
              <div class="password-container">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" class="toggle-password">
                  <i class="fas fa-eye-slash" id="eye-icon"></i>
                </button>
               </div>
          </div>

      <div class="input-group">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirm-password" placeholder="********" required>
      </div>
      <div class="buttons">    
        <a href="login" class="back-btn">&larr; back</a>
        <button type="submit" class="signup-btn">Signup</button>
      </div>
    </form>
  </div>
  <script src="./assests/js/signup.js" defer></script>
  <script src="./assests/js/login.js" defer></script>
</body>
</html>
