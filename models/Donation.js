// models/Donation.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  material: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  center: {
    type: Schema.Types.ObjectId,
    ref: 'Center', // Reference to the Center model (assuming you have one)
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming you have one)
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Donation = mongoose.model('donation', DonationSchema);
