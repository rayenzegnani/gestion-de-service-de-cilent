const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('auth.register called', req.body);
  const { name, email, password } = req.body || {};

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Veuillez fournir name, email et password' });
  }

  // Normalize email
  const normalizedEmail = String(email).trim().toLowerCase();

  // For security: public registration always creates a 'client' role.
  // Admins should be created via a protected flow or seed script.
  const role = 'client';

  // Check existing user
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) return res.status(400).json({ message: 'Email déjà utilisé' });

  // Hash password and save
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new User({ name: String(name).trim(), email: normalizedEmail, password: hash, role });
  await user.save();

  // Create token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    // Handle Mongo duplicate key error more clearly
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }
    console.error('Register error:', err);
    res.status(500).json({ message: err.message || 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('auth.login called', req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Identifiants invalides' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
