const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // Import MySQL2 connection
const bcrypt = require("bcrypt");

// Render the login page
router.get("/", (req, res) => {
  res.render("login"); // No message by default
});

// Handle login form submission
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body; // Get email & password from form

    // Query the database for a user with the given email
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);

    // If no user is found, show an alert and redirect back to the login page
    if (rows.length === 0) {
      return res.send(
        `<script>alert("User not found"); window.location.href="/login";</script>`
      );
    }

    const user = rows[0]; // Get user data from database

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send(
        `<script>alert("Invalid email or password!"); window.location.href="/login";</script>`
      );
    }

    // Store user data in the session
    req.session.user = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      type: user.type, // Employee, Admin, or Manager
    };

    // Show an alert with the user type and redirect to the home page
    return res.send(
      `<script>alert("You are an ${req.session.user.type}"); window.location.href="/";</script>`
    );
  } catch (err) {
    console.error("Login error:", err);
    return res.send(
      `<script>alert("Something went wrong!"); window.location.href="/login";</script>`
    );
  }
});

module.exports = router; // Export the router