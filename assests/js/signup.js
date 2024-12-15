const BASE_URL = "http://localhost/Bakery/api/users/signup.php";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const eyeIcon = document.getElementById("eye-icon");

  document.querySelector(".toggle-password").addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "password";
    passwordInput.type = isPasswordVisible ? "text" : "password";

    eyeIcon.classList.toggle("fa-eye", isPasswordVisible);
    eyeIcon.classList.toggle("fa-eye-slash", !isPasswordVisible);
  });

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const username = `${firstName} ${lastName}`;
    const phone_number = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (
      !firstName ||
      !lastName ||
      !phone_number ||
      !email ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone_number,
          email,
          address,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Signup failed. Please try again.");
        return;
      }

      const result = await response.json();
      alert("Signup successful! Welcome to Zebda W Zaatar.");

      window.location.href = "http://localhost/Bakery/login";
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});
