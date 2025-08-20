var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EVENT HUB' ,
                      description: 'Event Hub is a modern event management and ticket booking system designed to simplify the way people discover and attend events.

 For Users: Browse concerts, workshops, seminars, sports, and other events with ease. Book tickets securely, receive instant e-tickets, and get event reminders so you never miss out.

 For Organizers/Admins: Create and publish events quickly, manage ticket pricing and availability, track real-time bookings, and analyze event performance through a centralized dashboard.

 Secure and Reliable: Integrated payment gateway ensures safe transactions, while automated e-ticket delivery makes the process seamless.

 User-Friendly: Works across devices with an intuitive interface for both event seekers and organizers.

With Event Hub, managing and attending events becomes hassle-free, efficient, and engaging.'});
});

module.exports = router;
