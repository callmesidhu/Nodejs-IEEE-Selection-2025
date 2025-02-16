const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // Ensure this is the MySQL2 promise pool
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup", { message: null });
});

router.post("/submit", async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    const saltRounds = 10;

    // Hash the password asynchronously
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(req.body);
    // Use parameterized query (prevents SQL injection)
    const sql = "INSERT INTO users (fullname, password, email) VALUES (?, ?, ?)";
    await db.execute(sql, [fullname, hashPassword, email]);

    return res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    return res.render("signup", { message: "Signup failed" });
  }
});

module.exports = router;
