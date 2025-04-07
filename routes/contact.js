const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Contact routes - restricted to authenticated users only
router.get("/", isAuthenticated, HomeController.Contact);
router.post("/", isAuthenticated, HomeController.SubmitContact);

module.exports = router;
