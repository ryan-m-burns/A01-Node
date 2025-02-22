'use strict';

const express = require('express');
const app = express();

// Use environment variable if declared or default to 3000
const PORT = process.env.PORT || 3000;

// Load routers
const indexRouter = require('./routes/indexRouter');

// Morgan logger
const logger = require('morgan');
// Use logger as middleware, with 3 different output templates
app.use(logger('dev'));
app.use(logger('common'));
app.use(logger('combined'));

// Express.static middleware to make the public folder globally accessible
app.use(express.static("public"));

// Use index router
app.use(indexRouter);

// Catch-all route for 404 errors
app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});