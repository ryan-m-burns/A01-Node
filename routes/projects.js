const express = require("express");
const router = express.Router();
const projects = require("../data/projects");

// Get all projects
router.get("/", (req, res) => {
    if (req.query.format === "json") {
        return res.json(projects);
    }
    res.send(createProjectListHtml(projects));
});

// Search projects
router.get("/search", (req, res) => {
    const query = req.query.query?.toLowerCase() || "";
    const results = projects.filter(
        (project) =>
            project.title.toLowerCase().includes(query) ||
            project.summary.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query)
    );

    if (req.query.format === "json") {
        return res.json({
            searchTerm: query,
            results,
        });
    }
    res.send(createProjectListHtml(results, query));
});

// Get project by ID
router.get("/:id", (req, res) => {
    const project = projects.find((p) => p.id === parseInt(req.params.id));

    if (!project) {
        return res
            .status(404)
            .send(
                createErrorHtml(
                    "Project Not Found",
                    "The requested project does not exist."
                )
            );
    }

    if (req.query.format === "json") {
        return res.json(project);
    }

    res.send(createProjectDetailHtml(project));
});

// HTML Templates
function createProjectListHtml(projects, searchQuery = "") {
    const title = searchQuery
        ? `Search Results for "${searchQuery}"`
        : "My Projects";
    const backLink = searchQuery
        ? '<a href="/projects">&larr; Back to Projects</a>'
        : "";

    return `
        ${createHtmlHeader(title)}
        <h1>${title}</h1>
        ${backLink}
        <div class="search-container">
            <form id="searchForm" onsubmit="handleSearch(event)">
                <input 
                    type="text" 
                    class="search-bar" 
                    placeholder="Search Projects" 
                    value="${searchQuery}"
                    id="searchInput"
                    name="query"
                >
                <button type="submit">Search</button>
            </form>
        </div>
        <div id="project-list">
            ${projects
                .map(
                    (project) => `
                <div class="project-card" onclick="window.location.href='/projects/${
                    project.id
                }'">
                    <h2>${project.title}</h2>
                    <p>${project.summary}</p>
                    <ul>
                        ${project.tech
                            .map((tech) => `<li>${tech}</li>`)
                            .join("")}
                    </ul>
                    <div class="image-container">
                        <img src="${project.screenshot}" alt="${
                        project.title
                    } Screenshot">
                    </div>
                    <a href="/projects/${
                        project.id
                    }" class="view-details" onclick="event.stopPropagation()">View Details</a>
                </div>
            `
                )
                .join("")}
        </div>
        <script>
            function handleSearch(e) {
                e.preventDefault();
                const query = document.getElementById('searchInput').value.trim();
                
                if (query !== '') {
                    window.location.href = '/projects/search?query=' + encodeURIComponent(query);
                } else if (window.location.pathname === '/projects/search') {
                    window.location.href = '/projects';
                }
            }
        </script>
        ${createHtmlFooter()}
    `;
}

function createProjectDetailHtml(project) {
    return `
        ${createHtmlHeader(project.title)}
        <div class="project-detail-container">

            <h1>${project.title}</h1>
            <div class="project-detail-content">
                <div class="project-detail-image">
                    <img src="${project.screenshot}" alt="${
        project.title
    } Screenshot">
                </div>
                <div class="tech-stack">
                    <h2>Tech Stack</h2>
                    <ul>
                        ${project.tech
                            .map((tech) => `<li>${tech}</li>`)
                            .join("")}
                    </ul>
                </div>
                <div class="project-description">
                    <h2>Description</h2>
                    <p>${project.description}</p>
                </div>
            </div>
            <a href="/projects" class="back-link">&larr; Back to Projects</a>
        </div>
        ${createHtmlFooter()}
    `;
}

function createHtmlHeader(title) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - My Portfolio</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <header>
                <h1>My Node.js Portfolio</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/projects">Projects</a>
                    <a href="/contact">Contact</a>
                </nav>
            </header>
            <main>
    `;
}

function createHtmlFooter() {
    return `
            </main>
            <footer>&copy; 2025 Ryan Burns</footer>
        </body>
        </html>
    `;
}

function createErrorHtml(title, message) {
    return `
        ${createHtmlHeader(title)}
        <div class="error-page">
            <h1>${title}</h1>
            <p>${message}</p>
            <a href="/projects">&larr; Back to Projects</a>
        </div>
        ${createHtmlFooter()}
    `;
}

module.exports = router;
