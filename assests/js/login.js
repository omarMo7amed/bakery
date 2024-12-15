const BASE_URL = "http://localhost/Bakery/api/users/login.php";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  document.querySelector(".toggle-password").addEventListener("click", () => {
    const isPasswordVisible = passwordInput.type === "password";
    passwordInput.type = isPasswordVisible ? "text" : "password";

    eyeIcon.classList.toggle("fa-eye", isPasswordVisible);
    eyeIcon.classList.toggle("fa-eye-slash", !isPasswordVisible);
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        alert(error || "Login failed. Please try again.");
        return;
      }

      const result = await response.json();
      alert("Login successful! Welcome back.");

      window.location.href = "http://localhost/Bakery/menu";
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});
