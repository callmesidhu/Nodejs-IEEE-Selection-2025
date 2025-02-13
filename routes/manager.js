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

router.get('/', function(req, res, next) {
  res.render('manager', { teams: teams }); // Pass teams to the EJS template
});

module.exports = router;