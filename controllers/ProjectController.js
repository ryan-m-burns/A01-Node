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
      const project = await ProjectOps.createProject(req.body);

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
