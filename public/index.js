 const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");
    const forgotPassword = document.getElementById("forgotPassword");
    const signupLink = document.getElementById("signupLink");

    // Load remembered email
    window.addEventListener("load", () => {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMe.checked = true;
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value;
      const password = passwordInput.value;

      console.log("Email:", email);
      console.log("Password:", password);

      if (rememberMe.checked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      alert("Login submitted (frontend only)");
    });

    forgotPassword.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Forgot password requires backend");
    });

    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Sign up page coming soon 🚀");
    });
