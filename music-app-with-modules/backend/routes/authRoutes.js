const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/database');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    console.log("authRoutes.js - Sign up requested for user ID:" + username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hashedPassword], function (err) {
      if (err) {
        console.log("Signup error", err);
        return res.status(400).send({ message: 'Username already exists' });
      }
      console.log("authRoutes.js - Sign up request created for user ID:" + username);
      
          // Send userId and username in the signup request response
      res.status(201).send({ userId: this.lastID,  userName: username});
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ?`;

  console.log("authRoutes.js - Login requested for user ID:" + username);

  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Server error', error: err.message });
    }
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id, userName: user.username }, 'secretKey', { expiresIn: '1h' });
    console.log("authRoutes.js - Logged in successfully. user ID:" + username);
    
    // Send userId, username, and token in the login request response
    res.send({ userId: user.id, userName: user.username });
  });
});


module.exports = router;
