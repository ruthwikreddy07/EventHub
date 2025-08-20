var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`
    <h1>EVENT HUB</h1>
    <h2>Welcome to EVENT HUB</h2>
    <p>
      An Event Booking System that allows users to browse events,
      book tickets with secure payments, and receive e-tickets.
      Admins can manage events, track bookings, and monitor availability in real time.
    </p>
  `);
});

module.exports = router;
