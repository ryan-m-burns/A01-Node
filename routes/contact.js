const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("contact", { title: "Contact Me" });
});

router.post("/", (req, res) => {
    console.log("Contact Form Submission:", req.body);
    res.render("thank-you", { title: "Thank You" });
});

module.exports = router;
