const express = require("express");
const HomeController = require("../controllers/HomeController");
const router = express.Router();

// Contact routes
router.get("/", HomeController.Contact);
router.post("/", HomeController.SubmitContact);

module.exports = router;
