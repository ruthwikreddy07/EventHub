// File: backend/models/event.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true }, // <-- THIS IS THE RULE
  imageUrl: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);