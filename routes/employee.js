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
router.post('/meeting', async function (req, res) {
    if (!req.session.user) {
        return res.send(`<script>alert("You need to log in first!"); window.location.href='/login';</script>`);
    }

    const { meetingTitle, date, time, description } = req.body;
    const { fullname, email } = req.session.user;

    if (!meetingTitle || !date || !time || !description) {
        return res.send(`<script>alert("All fields are required!"); window.location.href='/employee';</script>`);
    }

    const query = `INSERT INTO meetings (fullname, email, meeting_title, date, time, description) VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const result = await db.query(query, [fullname, email, meetingTitle, date, time, description]);
        return res.send(`<script>alert("Meeting request sent successfully!"); window.location.href='/';</script>`);
    } catch (err) {
        return res.send(`<script>alert("An error occurred. Please try again later."); window.location.href='/employee';</script>`);
    }
});

module.exports = router;