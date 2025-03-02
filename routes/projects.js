const express = require("express");
const router = express.Router();
const projects = require("../data/projects");

// Get all projects
router.get("/", (req, res) => {
    if (req.query.format === "json") {
        return res.json(projects);
    }
    res.render("projects/index", {
        title: "My Projects",
        projects,
        searchQuery: ""
    });
});

// Search projects
router.get("/search", (req, res) => {
    const query = req.query.query?.toLowerCase() || "";
    const results = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(query) ||
            project.summary.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query)
    );

    if (req.query.format === "json") {
        return res.json({
            searchTerm: query,
            results,
        });
    }
    res.render("projects/index", {
        title: `Search Results for "${query}"`,
        projects: results,
        searchQuery: query
    });
});

// Get project by ID
router.get("/:id", (req, res) => {
    const project = projects.find((p) => p.id === parseInt(req.params.id));

    if (!project) {
        return res
            .status(404)
            .render("error", {
                title: "Project Not Found",
                message: "The requested project does not exist."
            });
    }

    if (req.query.format === "json") {
        return res.json(project);
    }

    res.render("projects/detail", {
        title: project.title,
        project
    });
});

module.exports = router;
