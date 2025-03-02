const express = require("express");
const router = express.Router();
const about = require("../data/about");

router.get("/", (req, res) => {
    if (req.query.format === "json") {
        return res.json(about);
    }

    res.render("about", { title: "About Me", about });
});

module.exports = router;
