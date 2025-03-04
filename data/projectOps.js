const Project = require("../models/Projects");

class ProjectOps {
    constructor() {}

    static async getAllProjects() {
        console.log("Getting all projects...");
        return await Project.find({});
    }

    static async getProjectById(id) {
        console.log(`Getting project with id ${id}...`);
        return await Project.findById(id);
    }
}

module.exports = ProjectOps;
