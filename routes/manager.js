var express = require("express");
var router = express.Router();
const db = require("../configs/dbconnection"); // Import MySQL2 connection

// Manager Dashboard Route
router.get("/", async function (req, res, next) {
  if (req.session.user) {
    if (req.session.user.type === "manager") {
        try {
            // Query to fetch all meeting requests
            const [meetings] = await db.execute("SELECT * FROM meetings");
        
            // Render the meetings page and pass data
            res.render("manager", { meetings });
          } catch (err) {
            console.error("Error fetching meetings:", err);
            res.send(`<script>alert("Error fetching meetings! Please try again."); window.location.href='/manager';</script>`);
          }
    } else {
      res.send(`<script>alert("You are an ${req.session.user.type}"); window.location.href='/';</script>`);
    }
  } else {
    res.send(`<script>alert("You need to log in first!"); window.location.href='/login';</script>`);
  }
});


module.exports = router;
