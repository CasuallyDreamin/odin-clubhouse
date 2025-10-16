import express from 'express';
import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername } from '../db/users.js';

const router = express.Router();

// Render registration page
router.get('/register', (req, res) => {
  res.render('auth/register', { title: "Register", error: null});
});

// Handle registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('auth/register', { title: "Register" , error: 'All fields are required.' });
  }

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.render('auth/register', { title: "Register", error: 'Username already taken.' });
  }

  const user = await createUser(username, password);
  req.session.user = { id: user.id, username: user.username };
  res.redirect('/posts');
});

// Render login page
router.get('/login', (req, res) => {
  res.render('auth/login', { title: "Login", error: null });
});

// Handle login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('auth/login', { title: "Login", error: 'All fields are required.' });
  }

  const user = await findUserByUsername(username);
  if (!user) {
    return res.render('auth/login', { title: "Login", error: 'Invalid credentials.' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.render('auth/login', { title: "Login", error: 'Invalid credentials.' });
  }

  req.session.user = { id: user.id, username: user.username };
  res.redirect('/posts');
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect('login');
  });
});

export default router;
