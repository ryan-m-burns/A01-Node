const path = require("path");

module.exports = {
    port: process.env.PORT || 3000,
    viewsDir: path.join(__dirname, "..", "views"),
    staticDir: path.join(__dirname, "..", "public"),
    env: process.env.NODE_ENV || "development",
};
