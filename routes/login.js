const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // Import MySQL2 connection
const bcrypt = require("bcrypt");

// Render the login page with an optional error message
router.get("/", (req, res) => {
  res.render("login", { message: null }); // By default, message is null
});

// Handle login form submission
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body; // Get email & password from form

    // Query the database for a user with the given email
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);

    // If no user is found, return an error message
    if (rows.length === 0) {
      return res.render("login", { message: "Invalid email or password!" });
    }

    const user = rows[0]; // Get user data from database

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render("login", { message: "Invalid email or password!" });
    }

    // If login is successful, redirect to dashboard
    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.render("login", { message: "Something went wrong!" });
  }
});

module.exports = router; // Export the router
