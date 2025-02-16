const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // MySQL2 promise pool
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup", { message: null });
});

router.post("/", async (req, res) => {
  try {
    const { fullname, password, email } = req.body;


    if (!fullname || !password || !email) {
      return res.render("signup", { message: "All fields are required!" });
    }

    // Check if the email already exists
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const [existingUser] = await db.execute(checkEmailQuery, [email]);

    if (existingUser.length > 0) {
      return res.render("signup", { message: "Email already exists!" });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const sql = "INSERT INTO users (fullname, password, email) VALUES (?, ?, ?)";
    await db.execute(sql, [fullname, hashPassword, email]);

    return res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { message: "Signup failed. Please try again." });
  }
});

module.exports = router;
