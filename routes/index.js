var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to IEEE 2025 Selection' });
});

module.exports = router;
