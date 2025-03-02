/**
 * Handle 404 errors
 */
function notFoundHandler(req, res, next) {
  if (req.query.format === 'json') {
    return res.status(404).json({ error: 'Page not found' });
  }

  res.status(404).render('error', {
    title: 'Not Found',
    message: 'The requested page does not exist.'
  });
}

/**
 * Handle all other errors
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (req.query.format === 'json') {
    return res.status(500).json({ error: 'Internal server error' });
  }

  res.status(500).render('error', {
    title: 'Error',
    message: 'Something went wrong. Please try again later.'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
