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

    static async createProject(projectData) {
        console.log("Creating new project...");
        const newProject = new Project(projectData);
        return await newProject.save();
    }

    static async updateProject(id, projectData) {
        console.log(`Updating project with id ${id}...`);
        return await Project.findByIdAndUpdate(id, projectData, { new: true });
    }

    static async deleteProject(id) {
        console.log(`Deleting project with id ${id}...`);
        return await Project.findByIdAndDelete(id);
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
