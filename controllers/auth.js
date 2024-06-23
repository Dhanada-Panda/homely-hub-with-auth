const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { name, address, email, password, phone, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, address, email, password: hashedPassword, phone, role });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.send({ token, user: { name: user.name, email: user.email, phone: user.phone, role: user.role } });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { signup, signin };
