const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  center: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Donation', DonationSchema);
