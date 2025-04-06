const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Middleware to check if user is NOT authenticated
const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/profile');
};

// Register page
router.get('/register', isNotAuthenticated, (req, res) => {
  res.render('register', { title: 'Register' });
});

// Register handler
router.post('/register', isNotAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    await User.register(user, password);

    // Authenticate the user after registration
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile');
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', {
      title: 'Register',
      error: error.message || 'Registration failed',
    });
  }
});

// Login page
router.get('/login', isNotAuthenticated, (req, res) => {
  res.render('login', { title: 'Login' });
});

// Login handler
router.post(
  '/login',
  isNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: false, // Set to true if you want to use flash messages
  })
);

// Logout handler
router.get('/logout', isAuthenticated, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Protected profile route example
router.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', {
    title: 'Profile',
    user: req.user,
  });
});

module.exports = router;
