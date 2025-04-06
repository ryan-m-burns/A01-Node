const ProfileOps = require("../data/profileOps");
const RequestService = require("../services/RequestService");

class HomeController {
    // Home page
    static async Index(req, res) {
        try {
            console.log("Loading home page data...");
            // Get authentication data
            const authData = RequestService.reqHelper(req);

            if (req.query.format === "json") {
                return res.json({
                    message: "Welcome to My Node.js Portfolio!"
                });
            }

            res.render("index", { 
                title: "Home",
                ...authData
            });
        } catch (error) {
            console.error("Error in Index method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load home page.",
            });
        }
    }

    // About page
    static async About(req, res) {
        try {
            console.log("Loading about page data...");
            // Get the default profile
            const profile = await ProfileOps.getDefaultProfile();
            // Get authentication data
            const authData = RequestService.reqHelper(req);

            if (!profile) {
                return res.status(404).render("error", {
                    title: "Profile Not Found",
                    message: "Profile information could not be found.",
                    ...authData
                });
            }

            if (req.query.format === "json") {
                return res.json(profile);
            }

            res.render("about", { 
                title: "About Me", 
                profile,
                ...authData 
            });
        } catch (error) {
            console.error("Error in About method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load about page.",
            });
        }
    }

    // Contact page
    static async Contact(req, res) {
        try {
            console.log("Loading contact page data...");
            // Get the default profile
            const profile = await ProfileOps.getDefaultProfile();

            if (!profile) {
                return res.status(404).render("error", {
                    title: "Profile Not Found",
                    message: "Contact information could not be found."
                });
            }

            if (req.query.format === "json") {
                return res.json({
                    message: "Contact Me",
                    contactInfo: profile.contactInfo,
                });
            }

            res.render("contact", { title: "Contact Me", profile });
        } catch (error) {
            console.error("Error in Contact method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load contact page.",
            });
        }
    }

    // Process contact form submission
    static async SubmitContact(req, res) {
        try {
            console.log("Contact Form Submission:", req.body);
            
            res.render("thank-you", { title: "Thank You" });
        } catch (error) {
            console.error("Error in SubmitContact method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to process contact form.",
            });
        }
    }
}

module.exports = HomeController;
