const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

// Home route
router.get("/", HomeController.Index);

module.exports = router;
