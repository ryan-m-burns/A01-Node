const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: String,
    headshot: String,
    bio: String,
    contactInfo: {
        email: String,
        phone: String,
        linkedin: String,
        github: String,
    },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
