var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EVENT HUB' ,
 description: 'An Event Booking System that allows users to browse events, book tickets with secure payments, and receive e-tickets. Admins can manage events, track bookings, and monitor availability in real time.'});
});

module.exports = router;