const ProjectController = require('../controllers/ProjectController');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { requireRoles } = require('../middleware/authMiddleware');

// Define admin role constant
const ADMIN_ROLE = 'admin';

// Public routes - accessible to all users
// Get all projects
router.get('/', ProjectController.Index);

// Search projects
router.get('/search', ProjectController.Search);

// Get project by ID (must be last of the public routes to avoid conflicts)
router.get('/:id', ProjectController.Detail);

// Admin-only routes - restricted to users with admin role
// Create new project
router.get('/create', requireRoles([ADMIN_ROLE]), ProjectController.CreateGet);
router.post(
  '/create',
  requireRoles([ADMIN_ROLE]),
  upload.single('screenshot'),
  ProjectController.CreatePost
);

// Edit project
router.get('/:id/edit', requireRoles([ADMIN_ROLE]), ProjectController.EditGet);
router.post(
  '/:id/edit',
  requireRoles([ADMIN_ROLE]),
  upload.single('screenshot'),
  ProjectController.EditPost
);

// Delete project
router.get('/:id/delete', requireRoles([ADMIN_ROLE]), ProjectController.DeleteGet);
router.post('/:id/delete', requireRoles([ADMIN_ROLE]), ProjectController.DeletePost);

module.exports = router;
