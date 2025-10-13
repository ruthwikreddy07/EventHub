// File: backend/routes/payment.routes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../middleware/auth');
const Event = require('../models/event.model');

// @route   POST api/payments/create-checkout-session
// @desc    Create a stripe checkout session
// @access  Private
router.post('/create-checkout-session', auth, async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: event.title,
              images: [event.imageUrl],
            },
            unit_amount: event.price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // These URLs are where Stripe will redirect the user after payment
      success_url: `${process.env.FRONTEND_URL}/profile?payment_success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/events/${eventId}`,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;