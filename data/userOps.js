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
}

module.exports = UserOps;
