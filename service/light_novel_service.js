var LightNovel = require("../models/light_novel");
var _ = require("lodash");

var errorMessages = {
    "NO_AUTHENTICATION": "You have no authentication for this action"
};

var lightNovelService = {
    name: "lightNovels",
    read: function (req, resource, params, config, actionCB) {
        if (params.id) {
            LightNovel.findById(params.id).exec()
                .then(
                function (lightNovel) {
                    return actionCB(null, lightNovel.toObject());
                },
                function (err) {
                    err.statusCode = 404;
                    return actionCB(err);
                });
        } else {
            LightNovel.find({}).lean().exec()
                .then(
                function (lightNovels) {
                    return actionCB(null, lightNovels);
                },
                function (err) {
                    err.statusCode = 404;
                    return actionCB(err);
                });
        }
    },
    create: function (req, resource, params, body, config, actionCB) {
        if (req.isUnauthenticated()) {
            return actionCB(new Error(errorMessages["NO_AUTHENTICATION"]));
        }
        var lightNovel = new LightNovel(body);
        lightNovel.save().then(
            function (lightNovel) {
                return actionCB(null, lightNovel.toObject());
            },
            function (err) {
                return actionCB(err);
            }
        );
    },
    update: function (req, resource, params, body, config, actionCB) {
        if (req.isUnauthenticated()) {
            return actionCB(new Error(errorMessages["NO_AUTHENICATION"]));
        }
        var lightNovelId = params.id;
        var title = body.title;
        var author = body.author;

        LightNovel.findById(lightNovelId).exec().then(
            function(lightNovel) {
                lightNovel.save(body).then(
                    function(lightNovel) {
                        actionCB(null, lightNovel.toObject());
                    },
                    function (err){
                        err.statusCode = 42;;
                        actionCB(err);
                    }
                )
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        );
        LightNovel.findOneAndUpdate(lightNovelId, {
            $set: {
                title: title,
                author: author
            }
        }, function (err, lightNovel) {
            if (err) {
                err.statusCode = 422;
                return actionCB(err);
            } else {

            }
        });
    },
    delete: function (req, resource, params, config, actionCB) {
        if (req.isUnauthenticated()) {
            return actionCB(new Error(errorMessages["NO_AUTHENTICATION"]));
        }
        var lightNovelId = params.id;

        LightNovel.findOneAndDelete(lightNovelId, function (err, lightNovel) {
            if (err) {
                err.statusCode = 422;
                return actionCB(err);
            } else {
                return lightNovel.toObject();
            }
        });
    }
};
module.exports = lightNovelService;
