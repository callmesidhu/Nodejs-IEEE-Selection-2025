var express = require('express');
var router = express.Router();

const teams = [
  {
      teamName: "Dev Team",
      leader: "john_doe",
      employee1: "jane_doe",
      employee2: "alice_smith"
  },
  {
      teamName: "Design Team",
      leader: "bob_jones",
      employee1: "charlie_brown",
      employee2: "diana_ross"
  },
  {
      teamName: "Marketing Team",
      leader: "emma_watson",
      employee1: "frank_sinatra",
      employee2: "grace_hopper"
  }
];

router.get('/', function (req, res, next) {
    if (req.session.user) {
        if (req.session.user.type === 'manager') {
            res.render('manager', { message: `You are an ${req.session.user.type}` });
        } else {
            res.send(`<script>alert("You are an ${req.session.user.type}"); window.location.href='/';</script>`);
        }
    } else {
        res.send(`<script>alert("You need to log in first!"); window.location.href='/login';</script>`);
    }
});

module.exports = router;


