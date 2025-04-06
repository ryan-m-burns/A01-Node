const User = require('../models/User');

class UserOps {
  constructor() {}

  static async getUserByEmail(email) {
    console.log(`Getting user with email ${email}...`);
    return await User.findOne({ email: email });
  }

  static async getUserByUsername(username) {
    console.log(`Getting user with username ${username}...`);
    return await User.findOne({ username: username });
  }

  static async getRolesByUsername(username) {
    console.log(`Getting roles for user ${username}...`);
    const user = await User.findOne({ username: username });
    return user ? user.roles || [] : [];
  }
}

module.exports = UserOps;
