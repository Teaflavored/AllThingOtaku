var passport = require("passport");
var extend = require("extend");

var authenticateService = {
    name: "authenticate",
    create: function (req, resource, params, body, config, callback) {
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

                return callback(err, user);
            });
        })(req, req.res, callback);
    }
};

module.exports = authenticateService;