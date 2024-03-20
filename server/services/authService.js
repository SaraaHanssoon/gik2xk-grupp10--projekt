// FIL: authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function registerUser(userData) {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
}

async function loginUser(userData) {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');
  
  const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
  return { token, user };
}

module.exports = { registerUser, loginUser };
