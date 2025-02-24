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
            <a href="/">&larr; Back to Home</a>
        </div>
        ${createHtmlFooter()}
    `;
}

module.exports = {
    createHtmlHeader,
    createHtmlFooter,
    createErrorHtml,
};
