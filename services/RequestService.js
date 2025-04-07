class RequestService {
  constructor() {}

  reqHelper(req, permittedRoles = []) {
    // Default to restricted permissions
    let rolePermitted = false;

    // Check if user is authenticated
    if (req.isAuthenticated()) {
      // Ensure session exists
      if (req.session) {
        // Check for roles in session
        if (req.session.roles) {
          // Check if user has any of the permitted roles
          if (permittedRoles.length > 0) {
            const matchingRoles = req.session.roles.filter((role) =>
              permittedRoles.includes(role)
            );
            rolePermitted = matchingRoles.length > 0;
          } else {
            // If no specific roles are required, user is permitted
            rolePermitted = true;
          }
        } else {
          // Initialize roles array if it doesn't exist
          req.session.roles = [];
          // If no specific roles are required, user is permitted
          rolePermitted = permittedRoles.length === 0;
        }
      }

      // Return authenticated user info
      return {
        authenticated: true,
        username: req.user.username,
        roles: req.session?.roles || [],
        rolePermitted: rolePermitted,
      };
    } else {
      // Return unauthenticated status
      return {
        authenticated: false,
        rolePermitted: false,
      };
    }
  }
}

module.exports = new RequestService();
