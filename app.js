const express = require('express');
const morgan = require('morgan');
const path = require('path');
const about = require('./data/about');

const app = express();
const PORT = process.env.PORT || 3000;

// tell Express where to find our templates (views)
app.set('views', path.join(__dirname, 'views'));

// set the view engine to pug
app.set('view engine', 'pug');
// Middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  if (req.query.format === 'json') {
    return res.json({ message: 'Welcome to My Node.js Portfolio!' });
  }

  res.render('index', { title: 'Home' });
});

app.get('/site', (req, res) => {
  res.render('site');
});

app.get('/about', (req, res) => {
  if (req.query.format === 'json') {
    return res.json(about);
  }

  res.render('about', { title: 'About Me', about });
});

// Project routes
app.use('/projects', require('./routes/projects'));

// Contact routes
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

app.post('/contact', (req, res) => {
  console.log('Contact Form Submission:', req.body);
  res.render('thank-you', { title: 'Thank You' });
});

// 404 Handler
app.use((req, res) => {
  if (req.query.format === 'json') {
    return res.status(404).json({ error: 'Page not found' });
  }

  res.status(404).render('error', {
    title: 'Not Found',
    message: 'The requested page does not exist.'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (req.query.format === 'json') {
    return res.status(500).json({ error: 'Internal server error' });
  }

  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
