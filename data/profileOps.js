const Profile = require("../models/Profile");

class ProfileOps {
    constructor() {}

    static async getAllProfiles() {
        console.log("Getting all profiles...");
        return await Profile.find({});
    }

    static async getProfileById(id) {
        console.log(`Getting profile with id ${id}...`);
        return await Profile.findById(id);
    }
}

module.exports = ProfileOps;
