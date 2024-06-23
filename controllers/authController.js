const User = require('../models/User'); // Assuming you have a User model

exports.signup = async (req, res) => {
  const { name, address, email, password, phone, role } = req.body;

  // Input validation
  if (!name || !address || !email || !password || !phone || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Debugging: Log the request body
    console.log('Signup request body:', req.body);

    // Logic to create a new user
    const user = new User({ name, address, email, password, phone, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Error creating user' });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Debugging: Log the request body
    console.log('Signin request body:', req.body);

    // Logic to authenticate user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'User signed in successfully', user });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(400).json({ error: 'Error signing in' });
  }
};
