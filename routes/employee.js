var express = require('express');
var router = express.Router();
var db = require('../configs/dbconnection'); 

// Employee Dashboard Route
router.get('/', function (req, res) {
    if (req.session.user) {
        if (req.session.user.type === 'employee') {
            res.render('employee', { message: `You are an ${req.session.user.type}` });
        } else {
            res.send(`<script>alert("You are an ${req.session.user.type}"); window.location.href='/';</script>`);
        }
    } else {
        res.send(`<script>alert("You need to log in first!"); window.location.href='/login';</script>`);
    }
});


// Handle Meeting Request Form Submission
router.post('/meeting', function (req, res) {
  if (!req.session.user) {
      return res.send(`<script>alert("You need to log in first!"); window.location.href='/login';</script>`);
  }

  // Extract data from the form and session
  const { meetingTitle, date, time, description } = req.body;
  console.log("Form Data: ", req.body);  // Log form data to check if it's being received correctly

  const { fullname, email } = req.session.user;
  console.log("Session Data: ", req.session.user);  // Log session data to check if it's being received correctly

  // SQL query to insert data into the meetings table
  const query = `
      INSERT INTO meetings (fullname, email, meeting_title, date, time, description)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  db.query(query, [fullname, email, meetingTitle, date, time, description], function (err, result) {
      if (err) {
          console.error('Error inserting meeting request:', err);
          return res.send(`<script>alert("An error occurred. Please try again later."); window.location.href='/employee';</script>`);
      }

      console.log('Meeting request submitted successfully!'); // Log successful submission

      // Send success alert and redirect to homepage
      return res.send(`
        <script>
          alert("Meeting request submitted successfully!");
          window.location.href = '/';
        </script>
      `);
  });
});



module.exports = router;
