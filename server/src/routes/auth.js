const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../db');

const router = express.Router();

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return jwt.sign(
    { id: user.id, email: user.email, userType: user.user_type },
    secret,
    { expiresIn: '7d' }
  );
}

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, userType, emergencyContact, institution } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const existing = getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const id = createUser({ email, passwordHash, name, userType, emergencyContact, institution });
    const user = { id, email, name, user_type: userType || 'student', emergency_contact: emergencyContact || null, institution: institution || null };
    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (userType && user.user_type !== userType) {
      return res.status(403).json({ error: 'User type mismatch' });
    }
    const token = signToken(user);
    res.json({
      user: { id: user.id, email: user.email, name: user.name, user_type: user.user_type },
      token,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


