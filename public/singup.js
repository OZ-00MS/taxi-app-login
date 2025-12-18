    const form = document.getElementById("signupForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.getElementById("gender").value;

  if (!fullname || !email || !password || !confirmPassword || !phone || !gender) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("Email already registered");
    return;
  }

  users.push({ fullname, email, password, phone, gender });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! You can now login.");
  form.reset();
  window.location.href = "index.html"; // redirect to login page
});