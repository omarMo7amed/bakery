<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Zebda W Zaatar | Login</title>
    <link rel="icon" type="image/webp" href="Images/icon.webp" />
    <link rel="stylesheet" href="./assests/css/login.css" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="login-container">
      <div class="login-box">
        <h1 class="title">
          Login
        </h1>
        <p class="subtitle">Welcome Back! Log in to your account.</p>
        <div class="photo">

          <img src="assests/images/login.webp" alt="login">
        </div>
        <form id="login-form" method="POST" action="">
          <div class="input-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
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

          <div class="links">
            <a href="#" class="forgot-password">Forgot Password?</a>
            <a href="signup" class="sign-up">Sign Up</a>
          </div>
          
          <div class="buttons">
            <a href="index.php" class="back-btn">&larr; back</a>
            <button type="submit" class="login-btn">Log In</button>
          </div>
        </form>

      </div>
    </div>

    <script src="./assests/js/login.js" defer></script>
  </body>
</html>
