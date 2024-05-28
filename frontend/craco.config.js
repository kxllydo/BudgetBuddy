const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
            "@components": path.resolve(__dirname, "./src/pages/components"),
            "@styles": path.resolve(__dirname, "./src/styles/"),
            "@pages": path.resolve(__dirname, "./src/pages/"),
            "@images": path.resolve(__dirname, "./src/images/")
        }
    }
}