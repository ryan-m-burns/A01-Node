const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

// About route
router.get("/", HomeController.About);

module.exports = router;
