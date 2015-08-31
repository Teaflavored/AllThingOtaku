var passport = require("passport");
var extend = require("extend");
var _ = require("lodash");

var authenticateService = {
    name: "authenticate",
    create: function (req, resource, params, body, config, callback) {
        if (req.user) {
            return callback(new Error("Already Signed in"));
        }

        req.body = extend(req.body, body);
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return callback(err);
            }

            if (!user) {
                return callback(info);
            }

            req.logIn(user, function (err2) {
                if (err2) {
                    return callback(err2);
                }

                return callback(err, _.omit(user.toObject(), "password"));
            });
        })(req, req.res, callback);
    },
    delete: function(req, resource, params, config, callback) {
        if (req.user) {
            req.logOut();
            callback(null, true);
        } else {
            callback(new Error("You are not currently signed in"));
        }
    }
};

module.exports = authenticateService;