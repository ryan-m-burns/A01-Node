const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Use logger as middleware, with 3 different output templates
app.use(logger('dev'));
app.use(logger('common'));
app.use(logger('combined'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});









app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});