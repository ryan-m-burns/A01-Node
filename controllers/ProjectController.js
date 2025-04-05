const ProjectOps = require('../data/projectOps');

class ProjectController {
  // Index method to get all projects
  static async Index(req, res) {
    try {
      const projects = await ProjectOps.getAllProjects();

      if (req.query.format === 'json') {
        return res.json(projects);
      }

      res.render('projects/index', {
        title: 'Projects',
        projects,
        searchQuery: '',
      });
    } catch (error) {
      console.error('Error in Index method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve projects.',
      });
    }
  }

  // Detail method to get a specific project by ID
  static async Detail(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
        });
      }

      if (req.query.format === 'json') {
        return res.json(project);
      }

      res.render('projects/detail', {
        title: project.title,
        project,
      });
    } catch (error) {
      console.error('Error in Detail method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project details.',
      });
    }
  }

  // GET method to display the create form
  static async CreateGet(req, res) {
    res.render('projects/create', { title: 'Create Project' });
  }

  // POST method to create a new project
  static async CreatePost(req, res) {
    try {
      const screenshot = req.file ? req.file.path.replace('public', '') : null;

      const project = await ProjectOps.createProject({
        ...req.body,
        screenshot,
      });

      if (req.query.format === 'json') {
        return res.json(project);
      }

      res.redirect('/projects');
    } catch (error) {
      console.error('Error in Create method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to create project.',
      });
    }
  }

  // GET method to display the delete form
  static async DeleteGet(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
        });
      }

      res.render('projects/delete', {
        title: 'Delete Project',
        project,
      });
    } catch (error) {
      console.error('Error in DeleteGet method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project for deletion.',
      });
    }
  }

  // POST method to delete a project
  static async DeletePost(req, res) {
    try {
      const project = await ProjectOps.deleteProject(req.params.id);

      if (req.query.format === 'json') {
        return res.json(project);
      }

      res.redirect('/projects');
    } catch (error) {
      console.error('Error in Delete method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to delete project.',
      });
    }
  }

  // GET method to display the edit form
  static async EditGet(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
        });
      }

      res.render('projects/edit', {
        title: 'Edit Project',
        project,
      });
    } catch (error) {
      console.error('Error in EditGet method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project for editing.',
      });
    }
  }

  // POST method to update a project
  static async EditPost(req, res) {
    try {
      // Handle file upload if present
      const screenshot = req.file
        ? req.file.path.replace('public', '')
        : req.body.screenshot;

      const project = await ProjectOps.updateProject(req.params.id, {
        ...req.body,
        screenshot,
      });

      if (req.query.format === 'json') {
        return res.json(project);
      }

      res.redirect(`/projects/${req.params.id}`);
    } catch (error) {
      console.error('Error in EditPost method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to update project.',
      });
    }
  }

  // Search method to search for projects
  static async Search(req, res) {
    try {
      const query = req.query.query?.trim() || '';

      if (query === '') {
        return res.redirect('/projects');
      }

      const results = await ProjectOps.searchProjects(query);

      if (req.query.format === 'json') {
        return res.json({
          searchTerm: query,
          results,
        });
      }

      res.render('projects/index', {
        title: `Search Results for "${query}"`,
        projects: results,
        searchQuery: query,
      });
    } catch (error) {
      console.error('Error in Search method:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to search projects.',
      });
    }
  }
}

module.exports = ProjectController;
