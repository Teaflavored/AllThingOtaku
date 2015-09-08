var sanitizeHtml = require("sanitize-html");

module.exports = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2"]),
    allowedClasses: {
        "*" : ["text-center"]
    }
};