var express = require("express");
var router = express.Router();
var db = require("../configs/dbconnection");
var bcrypt = require("bcrypt");

router.get("/", function (req, res, next) {
  res.render("signup");
});

router.post("/", async function (req, res, next) {
  const { fullname, password, email } = req.body;

  console.log("📥 Received Data:", { fullname, email });

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed Password:", hashedPassword);

    // Insert into MySQL
    let sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    db.query(sql, [fullname, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Database Error:", err);
        return res.status(500).send("Database error!");
      }

      console.log("✅ User added successfully:", result);
      
      // Debugging redirection
      console.log("➡️ Redirecting to /login");

      return res.redirect("/login");
    });

  } catch (error) {
    console.error("❌ Unexpected Error:", error);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
