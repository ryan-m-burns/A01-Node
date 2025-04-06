const passport = require('passport');
const User = require('../models/User');
const UserOps = require('../data/userOps');
const RequestService = require('../services/RequestService');

class UserController {
  // Register page
  static async RegisterGet(req, res) {
    // Get authentication data
    const authData = RequestService.reqHelper(req);

    // If user is already authenticated, redirect to profile
    if (authData.authenticated) {
      return res.redirect('/profile');
    }

    res.render('register', {
      title: 'Register',
      ...authData,
    });
  }

  // Register handler
  static async RegisterPost(req, res) {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserOps.getUserByUsername(username);
      if (existingUser) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        return res.render('register', {
          title: 'Register',
          error: 'Username already exists',
          ...authData,
        });
      }

      // Check if email already exists
      const existingEmail = await UserOps.getUserByEmail(email);
      if (existingEmail) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        return res.render('register', {
          title: 'Register',
          error: 'Email already exists',
          ...authData,
        });
      }

      // Create new user
      const user = new User({ username, email });
      await User.register(user, password);

      console.log(`User registered: ${username}`);

      // Authenticate the user after registration
      req.login(user, (err) => {
        if (err) {
          console.error('Login error after registration:', err);
          return next(err);
        }
        return res.redirect('/profile');
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      res.render('register', {
        title: 'Register',
        error: error.message || 'Registration failed',
        ...authData,
      });
    }
  }

  // Login page
  static async LoginGet(req, res) {
    // Get authentication data
    const authData = RequestService.reqHelper(req);

    // If user is already authenticated, redirect to profile
    if (authData.authenticated) {
      return res.redirect('/profile');
    }

    res.render('login', {
      title: 'Login',
      ...authData,
    });
  }

  // Login handler
  static async LoginPost(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }

      if (!user) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        return res.render('login', {
          title: 'Login',
          error: 'Invalid Credentials',
          ...authData,
        });
      }

      req.login(user, (err) => {
        if (err) {
          console.error('Login error:', err);
          return next(err);
        }
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  // Logout handler
  static async Logout(req, res, next) {
    // Check if user is authenticated before logging out
    if (req.isAuthenticated()) {
      const username = req.user.username;
      req.logout((err) => {
        if (err) {
          console.error('Logout error:', err);
          return next(err);
        }
        console.log(`User logged out: ${username}`);
        res.redirect('/');
      });
    } else {
      res.redirect('/login');
    }
  }

  // Profile page
  static async Profile(req, res) {
    try {
      // Get authentication data
      const authData = RequestService.reqHelper(req);

      // If user is not authenticated, redirect to login
      if (!authData.authenticated) {
        return res.redirect('/login');
      }

      // Get the full user object from the database
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).render('error', {
          title: 'User Not Found',
          message: 'User not found in the database.',
          ...authData,
        });
      }

      res.render('profile', {
        title: 'Profile',
        user,
        ...authData,
      });
    } catch (error) {
      console.error('Profile error:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to load profile.',
        ...authData,
      });
    }
  }
}

module.exports = UserController;
