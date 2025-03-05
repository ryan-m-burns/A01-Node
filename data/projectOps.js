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

    static async searchProjects(query) {
        console.log(`Searching projects with query: ${query}`);
        const queryRegex = new RegExp(query, "i");

        return await Project.find({
            $or: [
                { title: queryRegex },
                { summary: queryRegex },
                { description: queryRegex },
                { tech: queryRegex },
            ],
        });
    }
}

module.exports = ProjectOps;
