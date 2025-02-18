const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // MySQL2 promise pool
const bcrypt = require("bcrypt");

// Render the signup page
router.get("/", (req, res) => {
  res.render("signup"); // No message by default
});

// Handle signup form submission
router.post("/", async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    // Check if all fields are provided
    if (!fullname || !password || !email) {
      return res.send(
        `<script>alert("All fields are required!"); window.location.href="/signup";</script>`
      );
    }

    // Check if the email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const [existingUser] = await db.execute(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      return res.send(
        `<script>alert("Email already exists!"); window.location.href="/signup";</script>`
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const sql = "INSERT INTO users (fullname, password, email) VALUES (?, ?, ?)";
    await db.execute(sql, [fullname, hashPassword, email]);

    // Redirect to the login page after successful signup
    return res.send(
      `<script>alert("Signup successful! Please login."); window.location.href="/login";</script>`
    );
  } catch (err) {
    console.error("Signup error:", err);
    return res.send(
      `<script>alert("Signup failed. Please try again."); window.location.href="/signup";</script>`
    );
  }
});

module.exports = router;