# Node.js Portfolio

A simple and modern portfolio website built with Node.js and Express.

## Features

- Responsive design with modern UI
- Project showcase with search functionality
- Contact form
- JSON API endpoints for all routes
- Static file serving for CSS and images

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node app.js
```

3. Visit [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

- `GET /` - Homepage
- `GET /about` - About page
- `GET /projects` - Project list
- `GET /projects/search?query=xyz` - Search projects
- `GET /projects/:id` - Project details
- `GET /contact` - Contact form
- `POST /contact` - Submit contact form

Add `?format=json` to any GET endpoint to receive a JSON response.

## Technologies

- Node.js
- Express
- Morgan (logging)
- Static file serving