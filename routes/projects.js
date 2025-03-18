const ProjectController = require('../controllers/ProjectController');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Get all projects
router.get('/', ProjectController.Index);

// Search projects
router.get('/search', ProjectController.Search);

// Create new project
router.get('/create', ProjectController.CreateGet);
router.post(
  '/create',
  upload.single('screenshot'),
  ProjectController.CreatePost
);

// Edit project
router.get('/:id/edit', ProjectController.EditGet);
router.post('/:id/edit', ProjectController.EditPost);

// Delete project
router.get('/:id/delete', ProjectController.DeleteGet);
router.post('/:id/delete', ProjectController.DeletePost);

// Get project by ID (must be last to avoid conflicts with other routes)
router.get('/:id', ProjectController.Detail);

module.exports = router;
