const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Configure passport to use the local strategy
passport.use(new LocalStrategy(User.authenticate()));

// Serialize user for the session
passport.serializeUser(User.serializeUser());

// Deserialize user from the session
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
