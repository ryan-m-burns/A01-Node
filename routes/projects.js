const ProjectController = require('../controllers/ProjectController');
const express = require('express');
const router = express.Router();

// Get all projects
router.get('/', ProjectController.Index);

// Search projects
router.get('/search', ProjectController.Search);

// Create new project
router.get('/create', ProjectController.Create);
router.post('/create', ProjectController.Create);

// Update project
router.get('/update/:id', ProjectController.Update);
router.post('/update/:id', ProjectController.Update);

// Delete project
router.get('/delete/:id', ProjectController.Delete);
router.post('/delete/:id', ProjectController.Delete);

// Get project by ID (must be last to avoid conflicts with other routes)
router.get('/:id', ProjectController.Detail);

module.exports = router;
