const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations'); // Import donation routes
const centerRoutes = require('./routes/centers'); // Import center routes
const userRouter = require('./routes/users'); // Import user routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes); // Use donations routes
app.use('/api/centers', centerRoutes); // Use centers routes
app.use('/api/users', userRouter); // Use user routes

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
