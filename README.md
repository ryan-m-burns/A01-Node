# Node.js Portfolio

A simple and modern portfolio website built with Node.js, Express, Pug templates, and MongoDB.

## Features

- Responsive design with modern UI
- Project showcase with search functionality
- Contact form
- JSON API endpoints for all routes
- Static file serving for CSS and images
- Modular architecture with separated routes and middleware
- MongoDB database integration with Mongoose ODM
- Database seeding for initial data

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection parameters with your credentials

3. Seed the database with initial data:
```bash
npm run seed
```

4. Start the server:
```bash
npm start
```

5. For development with auto-restart:
```bash
npm run dev
```

6. Visit [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This application uses MongoDB with Mongoose ODM for data storage. The database connection is configured in `config/database.js`.

### Models

- **Profile**: Stores personal information, bio, and contact details
- **Project**: Stores project information including title, description, tech stack, and screenshots

### Seeding

The application includes a seeding script to populate the database with initial data:

```bash
npm run seed
```

This will clear existing data and insert sample profile and project data from `scripts/seed.js`.

## Project Structure

```
├── config/             # Application configuration
│   ├── app.js          # App settings
│   └── database.js     # Database connection
├── controllers/        # Route controllers
├── data/               # Data access operations
├── middleware/         # Express middleware
├── models/             # Mongoose models
├── public/             # Static assets (CSS, images)
├── routes/             # Route handlers
├── scripts/            # Utility scripts
│   └── seed.js         # Database seeding
├── views/              # Pug templates
│   ├── layouts/        # Layout templates
│   ├── partials/       # Reusable template parts
│   └── projects/       # Project-specific templates
├── app.js              # Application entry point
├── .env.example        # Example environment variables
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

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose (ODM)
  - Dotenv (environment variables)
  
- **Frontend**:
  - Pug (template engine)
  - CSS
  
- **Development**:
  - Nodemon (auto-restart)
  - Morgan (logging)