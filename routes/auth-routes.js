const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Register routes
router.get('/register', UserController.RegisterGet);
router.post('/register', UserController.RegisterPost);

// Login routes
router.get('/login', UserController.LoginGet);
router.post('/login', UserController.LoginPost);

// Logout route
router.get('/logout', isAuthenticated, UserController.Logout);

// Profile route
router.get('/profile', isAuthenticated, UserController.Profile);

module.exports = router;
