const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Users JSON file
const dataFile = './users.json';
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, '[]');

// Helper functions to read/write users
const getUsers = () => JSON.parse(fs.readFileSync(dataFile));
const saveUsers = (users) => fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));

// ------------------ SIGNUP ------------------
app.post('/signup', (req, res) => {
  const { fullname, username, password, confirmPassword, phone, gender } = req.body;

  if (!fullname || !username || !password || !confirmPassword || !phone || !gender)
    return res.send('All fields required!');

  if (password !== confirmPassword)
    return res.send('Passwords do not match!');

  const users = getUsers();
  if (users.find(u => u.username === username))
    return res.send('Username already exists!');

  users.push({ fullname, username, password, phone, gender });
  saveUsers(users);

  res.send('Signup successful! <a href="index.html">Go to login</a>');
});

// ------------------ LOGIN ------------------
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    // Redirect to login-failed page if credentials are wrong
    return res.redirect('/login-failed.html');
  }

  // Redirect to home page with username if login is successful
  res.redirect(`/home.html?username=${encodeURIComponent(user.username)}`);
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
