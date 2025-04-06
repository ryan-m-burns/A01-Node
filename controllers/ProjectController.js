const ProjectOps = require('../data/projectOps');
const RequestService = require('../services/RequestService');

class ProjectController {
  // Index method to get all projects
  static async Index(req, res) {
    try {
      const projects = await ProjectOps.getAllProjects();

      if (req.query.format === 'json') {
        return res.json(projects);
      }
      
      // Get authentication data
      const authData = RequestService.reqHelper(req);

      res.render('projects/index', {
        title: 'Projects',
        projects,
        searchQuery: '',
        ...authData
      });
    } catch (error) {
      console.error('Error in Index method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve projects.',
        ...authData
      });
    }
  }

  // Detail method to get a specific project by ID
  static async Detail(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
          ...authData
        });
      }

      if (req.query.format === 'json') {
        return res.json(project);
      }
      
      // Get authentication data
      const authData = RequestService.reqHelper(req);

      res.render('projects/detail', {
        title: project.title,
        project,
        ...authData
      });
    } catch (error) {
      console.error('Error in Detail method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project details.',
        ...authData
      });
    }
  }

  // GET method to display the create form
  static async CreateGet(req, res) {
    // Get authentication data
    const authData = RequestService.reqHelper(req);
    res.render('projects/create', { 
      title: 'Create Project',
      ...authData 
    });
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
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to create project.',
        ...authData
      });
    }
  }

  // GET method to display the delete form
  static async DeleteGet(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
          ...authData
        });
      }

      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.render('projects/delete', {
        title: 'Delete Project',
        project,
        ...authData
      });
    } catch (error) {
      console.error('Error in DeleteGet method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project for deletion.',
        ...authData
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
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to delete project.',
        ...authData
      });
    }
  }

  // GET method to display the edit form
  static async EditGet(req, res) {
    try {
      const project = await ProjectOps.getProjectById(req.params.id);

      if (!project) {
        // Get authentication data
        const authData = RequestService.reqHelper(req);
        
        return res.status(404).render('error', {
          title: 'Project Not Found',
          message: 'The requested project does not exist.',
          ...authData
        });
      }

      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.render('projects/edit', {
        title: 'Edit Project',
        project,
        ...authData
      });
    } catch (error) {
      console.error('Error in EditGet method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to retrieve project for editing.',
        ...authData
      });
    }
  }

  // POST method to update a project
  static async EditPost(req, res) {
    try {
      // Handle file upload if present
      const screenshot = req.file
        ? req.file.path.replace('public', '')
        : req.body.existing_screenshot;

      // Create updated project data with all fields except existing_screenshot
      const { existing_screenshot, ...projectData } = req.body;

      const project = await ProjectOps.updateProject(req.params.id, {
        ...projectData,
        screenshot,
      });

      if (req.query.format === 'json') {
        return res.json(project);
      }

      res.redirect(`/projects/${req.params.id}`);
    } catch (error) {
      console.error('Error in EditPost method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to update project.',
        ...authData
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

      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.render('projects/index', {
        title: `Search Results for "${query}"`,
        projects: results,
        searchQuery: query,
        ...authData
      });
    } catch (error) {
      console.error('Error in Search method:', error);
      // Get authentication data
      const authData = RequestService.reqHelper(req);
      
      res.status(500).render('error', {
        title: 'Error',
        message: 'Failed to search projects.',
        ...authData
      });
    }
  }
}

module.exports = ProjectController;
