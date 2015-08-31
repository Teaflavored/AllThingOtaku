var User = require("../models/user");

var userService = {
    name: "users",
    create: function (req, resource, params, body, config, callback) {
        if (req.user) {
            return callback(new Error("You are already signed in"));
        }
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
                req.logIn(user, function (err2) {
                    if (err2) {
                        err.statusCode = 403;
                        callback(err2);
                    } else {
                        callback(null, user);
                    }
                });
            }
        });
    }
};

module.exports = userService;