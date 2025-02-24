const express = require("express");
const morgan = require("morgan");
const path = require("path");
const {
    createHtmlHeader,
    createHtmlFooter,
    createErrorHtml,
} = require("./utils/htmlTemplates");
const about = require("./data/about");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.get("/", (req, res) => {
    if (req.query.format === "json") {
        return res.json({ message: "Welcome to My Node.js Portfolio!" });
    }

    const html = `
        ${createHtmlHeader("Home")}
        <h1>Welcome to My Node.js Portfolio</h1>
        <p>Welcome to my portfolio website where you can find information about my projects and skills.</p>
        
        <div class="nav-cards">
            <a href="/about" class="nav-card">
                <div class="nav-card-content">
                    <h2>About Me</h2>
                    <p>Learn more about my background, skills, and experience in web development.</p>
                </div>
            </a>
            <a href="/projects" class="nav-card">
                <div class="nav-card-content">
                    <h2>Projects</h2>
                    <p>Explore my portfolio of web development projects and applications.</p>
                </div>
            </a>
            <a href="/contact" class="nav-card">
                <div class="nav-card-content">
                    <h2>Contact</h2>
                    <p>Get in touch with me to discuss opportunities or collaborations.</p>
                </div>
            </a>
        </div>
        ${createHtmlFooter()}
    `;

    res.send(html);
});

app.get("/about", (req, res) => {
    if (req.query.format === "json") {
        return res.json(about);
    }

    const html = `
        ${createHtmlHeader("About Me")}
        <div class="about-container">
            <div class="about-header">
                <img src="${about.headshot}" alt="${
        about.name
    }" class="headshot">
                <div class="about-intro">
                    <h1>About Me</h1>
                    <h2>${about.title}</h2>
                </div>
            </div>
            <p class="bio">${about.bio}</p>
        </div>
        ${createHtmlFooter()}
    `;

    res.send(html);
});

// Project routes
app.use("/projects", require("./routes/projects"));

// Contact routes
app.get("/contact", (req, res) => {
    const html = `
        ${createHtmlHeader("Contact Me")}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <div class="contact-container">
            <h1>Contact Me</h1>
            
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <a href="tel:778-628-8346">778-628-8346</a>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <a href="mailto:ryan.m.burns123@gmail.com">ryan.m.burns123@gmail.com</a>
                </div>
                <div class="contact-item">
                    <i class="fab fa-linkedin"></i>
                    <a href="https://linkedin.com/in/ryanburns604" target="_blank">linkedin.com/in/ryanburns604</a>
                </div>
                <div class="contact-item">
                    <i class="fab fa-github"></i>
                    <a href="https://github.com/ryan-m-burns" target="_blank">github.com/ryan-m-burns</a>
                </div>
            </div>

            <div class="contact-form-container">
                <h2>Send me a message</h2>
                <form class="contact-form" method="POST" action="/contact">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
        ${createHtmlFooter()}
    `;

    res.send(html);
});

app.post("/contact", (req, res) => {
    console.log("Contact Form Submission:", req.body);
    const html = `
        ${createHtmlHeader("Thank You")}
        <h1>Thank you for reaching out!</h1>
        ${createHtmlFooter()}
    `;
    res.send(html);
});

// 404 Handler
app.use((req, res) => {
    if (req.query.format === "json") {
        return res.status(404).json({ error: "Page not found" });
    }

    res.status(404).send(
        createErrorHtml("Not Found", "The requested page does not exist.")
    );
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (req.query.format === "json") {
        return res.status(500).json({ error: "Internal server error" });
    }

    res.status(500).send(
        createErrorHtml(
            "Error",
            "Something went wrong. Please try again later."
        )
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
