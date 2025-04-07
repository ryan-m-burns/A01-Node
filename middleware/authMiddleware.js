const RequestService = require('../services/RequestService');

/**
 * Middleware to check if user has required roles
 * @param {Array} requiredRoles - Array of roles that are allowed to access the route
 * @returns {Function} Express middleware function
 */
const requireRoles = (requiredRoles = []) => {
  return (req, res, next) => {
    // Get authentication data including role permission check
    const authData = RequestService.reqHelper(req, requiredRoles);
    
    // If user is authenticated and has required role, allow access
    if (authData.authenticated && authData.rolePermitted) {
      return next();
    }
    
    // If user is authenticated but doesn't have required role
    if (authData.authenticated) {
      return res.status(403).render('error', {
        title: 'Access Denied',
        message: 'You do not have permission to access this resource.',
        ...authData
      });
    }
    
    // If user is not authenticated, redirect to login
    return res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
  };
};

/**
 * Middleware to check if user is authenticated
 * @returns {Function} Express middleware function
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login?returnTo=' + encodeURIComponent(req.originalUrl));
};

module.exports = {
  requireRoles,
  isAuthenticated
};
