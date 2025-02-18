const express = require("express");
const router = express.Router();
const db = require("../configs/dbconnection"); // Ensure this path is correct

// Admin route to view meeting requests
router.get("/", async function (req, res, next) {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.send(
      `<script>alert("You need to log in first!"); window.location.href='/login';</script>`
    );
  }

  // Check if the user is an admin
  if (req.session.user.type !== "admin") {
    return res.send(
      `<script>alert("You are an ${req.session.user.type}"); window.location.href='/';</script>`
    );
  }

  try {
    // Query to fetch all meeting requests
    const [meetings] = await db.execute("SELECT * FROM meetings");

    // Render the admin page and pass the meetings data
    res.render("admin", { meetings });
  } catch (err) {
    console.error("Error fetching meetings:", err);

    // Display an alert and redirect to the manager page
    res.send(
      `<script>alert("Error fetching meetings! Please try again."); window.location.href='/manager';</script>`
    );
  }
});

module.exports = router;