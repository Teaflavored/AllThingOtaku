var LightNovel = require("../models/light_novel");
var _ = require("lodash");

var errorMessages = {
    "NO_AUTHENTICATION": "You have no authentication for this action"
};

var lightNovelService = {
    name: "lightNovels",
    read: function (req, resource, params, config, actionCB) {
        if (params.id) {
            LightNovel.findById(params.id, function (err, lightNovel) {
                if (err) {
                    actionCB(err);
                } else {
                    actionCB(null, lightNovel)
                }
            });
        } else {
            LightNovel.find().lean().exec({}, function (err, lightNovels) {
                if (err) {
                    actionCB(err);
                } else {
                    actionCB(null, lightNovels);
                }
            });
        }
    },
    create: function (req, resource, params, body, config, actionCB) {
        if (!req.user) {
            return actionCB(new Error(errorMessages["NO_AUTHENTICATION"]));
        }

        var lightNovel = new LightNovel(body);
        lightNovel.save(function (err) {
            //check save error
            if (err) {
                err.statusCode = 422;

                if (err.errors && err.errors.title) {
                    err.message = err.errors.title.message;
                    actionCB(err);
                } else if (err.errors && err.errors.author) {
                    err.message = err.errors.author.message;
                    actionCB(err);
                } else {
                    actionCB(err);
                }
            } else {
                //successful insert
                actionCB(null, _.omit(lightNovel.toObject(), "volumes"));
            }
        });
    },
    update: function () {

    },
    delete: function () {

    }
};
module.exports = lightNovelService;
