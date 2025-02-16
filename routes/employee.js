var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
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

module.exports = router;
