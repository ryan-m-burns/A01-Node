const ProjectController = require("../controllers/ProjectController");
const express = require("express");
const router = express.Router();

// Get all projects
router.get("/", ProjectController.Index);

// Search projects
router.get("/search", ProjectController.Search);

// Get project by ID (must be last to avoid conflicts with other routes)
router.get("/:id", ProjectController.Detail);

module.exports = router;
