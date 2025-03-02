const express = require("express");
const router = express.Router();

// Import route modules
const indexRoutes = require("./index");
const aboutRoutes = require("./about");
const projectRoutes = require("./projects");
const contactRoutes = require("./contact");

// Register routes
router.use("/", indexRoutes);
router.use("/about", aboutRoutes);
router.use("/projects", projectRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
