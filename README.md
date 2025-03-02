# Node.js Portfolio

A simple and modern portfolio website built with Node.js, Express, and Pug templates.

## Features

- Responsive design with modern UI
- Project showcase with search functionality
- Contact form
- JSON API endpoints for all routes
- Static file serving for CSS and images
- Modular architecture with separated routes and middleware

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. For development with auto-restart:
```bash
npm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── config/             # Application configuration
├── data/               # Data models and mock data
├── middleware/         # Express middleware
├── public/             # Static assets (CSS, images)
├── routes/             # Route handlers
├── views/              # Pug templates
│   ├── layouts/        # Layout templates
│   ├── partials/       # Reusable template parts
│   └── projects/       # Project-specific templates
├── app.js              # Application entry point
└── package.json        # Project metadata and dependencies
```

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
- Pug (template engine)
- Morgan (logging)
- Static file serving