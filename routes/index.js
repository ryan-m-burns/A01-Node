const express = require("express");
const router = express.Router();

// Home route
router.get("/", (req, res) => {
    if (req.query.format === "json") {
        return res.json({ message: "Welcome to My Node.js Portfolio!" });
    }

    res.render("index", { title: "Home" });
});

module.exports = router;
