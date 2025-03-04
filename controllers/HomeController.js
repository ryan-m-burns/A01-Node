const ProfileOps = require("../data/profileOps");

class HomeController {
    // Home page
    static async Index(req, res) {
        try {
            console.log("Loading home page data...");
            // Get the default profile (we can use the first one if there are multiple)
            const profiles = await ProfileOps.getAllProfiles();
            const profile = profiles.length > 0 ? profiles[0] : null;
            
            if (req.query.format === "json") {
                return res.json({ 
                    message: "Welcome to My Node.js Portfolio!",
                    profile 
                });
            }
            
            res.render("index", { title: "Home", profile });
        } catch (error) {
            console.error("Error in Index method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load home page."
            });
        }
    }

    // About page
    static async About(req, res) {
        try {
            console.log("Loading about page data...");
            // Get the default profile
            const profiles = await ProfileOps.getAllProfiles();
            const profile = profiles.length > 0 ? profiles[0] : null;
            
            if (req.query.format === "json") {
                return res.json(profile);
            }
            
            res.render("about", { title: "About Me", profile });
        } catch (error) {
            console.error("Error in About method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load about page."
            });
        }
    }

    // Contact page
    static async Contact(req, res) {
        try {
            console.log("Loading contact page data...");
            // Get the default profile
            const profiles = await ProfileOps.getAllProfiles();
            const profile = profiles.length > 0 ? profiles[0] : null;
            
            if (req.query.format === "json") {
                return res.json({ 
                    message: "Contact Me",
                    contactInfo: profile?.contactInfo 
                });
            }
            
            res.render("contact", { title: "Contact Me", profile });
        } catch (error) {
            console.error("Error in Contact method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to load contact page."
            });
        }
    }

    // Process contact form submission
    static async SubmitContact(req, res) {
        try {
            console.log("Contact Form Submission:", req.body);
            // Get the default profile for the thank you page
            const profiles = await ProfileOps.getAllProfiles();
            const profile = profiles.length > 0 ? profiles[0] : null;
            
            res.render("thank-you", { title: "Thank You", profile });
        } catch (error) {
            console.error("Error in SubmitContact method:", error);
            res.status(500).render("error", {
                title: "Error",
                message: "Failed to process contact form."
            });
        }
    }
}

module.exports = HomeController;
