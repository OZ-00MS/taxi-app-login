    // Get username from URL query parameters
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');

    // Display username dynamically
    if(username) {
      document.getElementById('welcomeText').textContent = `Welcome, ${username}!`;
    }

    // Logout button function
    function logout() {
      window.location.href = "index.html";
    }