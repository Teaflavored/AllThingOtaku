var User = require("../models/user");

var userService = {
    name: "users",
    create: function (req, resource, params, body, config, callback) {
        var user = new User(body);
        user.save(function (err) {
            if (err) {
                err.statusCode = 422;
                if (err.errors && err.errors.email) {
                    err.message = err.errors.email.message;
                    callback(err);
                } else if (err.errors && err.errors.password) {
                    err.message = err.errors.password.message;
                    callback(err);
                } else {
                    callback(err);
                }
            } else {
                callback(null, user);
            }
        });
    }
};

module.exports = userService;