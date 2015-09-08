var sanitizeHtml = require("sanitize-html");

module.exports = {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedClasses: {
        "*" : ["text-center"]
    }
};