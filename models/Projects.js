const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    summary: String,
    description: String,
    tech: [String],
    screenshot: String,
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
