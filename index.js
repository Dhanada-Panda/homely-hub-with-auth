const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const app = express();

mongoose.connect('mongodb://localhost:27017/donationsDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
