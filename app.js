// Import dependencies
const express = require("express");
const morgan = require("morgan");
const config = require("./config/app");
const { connectToDatabase } = require("./config/database");
const allRoutes = require("./routes/all-routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandlers");

// Load environment variables
require("dotenv").config();

// Initialize Express app
const app = express();

// View engine setup
app.set("views", config.viewsDir);
app.set("view engine", "pug");

// Middleware setup
app.use(morgan("dev"));
app.use(express.static(config.staticDir));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Connect to MongoDB (async)
(async () => {
    try {
        await connectToDatabase();
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        // Continue app execution even if DB connection fails
    }
})();

// Routes
app.use("/", allRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});

module.exports = app; // Export for testing
