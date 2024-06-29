const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const centerSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    // Add other fields as necessary
});

module.exports = mongoose.model('Center', centerSchema);
