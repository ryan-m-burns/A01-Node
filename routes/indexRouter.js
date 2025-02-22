const express = require("express");
const indexRouter = express.Router();
const path = require("path");

indexRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../pages/index.html"));
});

indexRouter.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/../pages/about.html"));
});

indexRouter.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "/../pages/contact.html"));
});



module.exports = indexRouter;