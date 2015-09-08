var LightNovel = require("../models/light_novel");
var sanitizeHtml = require("sanitize-html");
var sanitizeOptions = require("../utils/sanitize_options");
var _ = require("lodash");

var errorMessages = {
    "NO_AUTHENTICATION": "You have no authentication for this action"
};

var lightNovelService = {
    name: "lightNovels",
    read: function (req, resource, params, config, actionCB) {
        if (params.lightNovelId) {
            LightNovel.findById(params.lightNovelId).exec()
                .then(
                function (lightNovel) {
                    return actionCB(null, lightNovel.toObjectNoChapterText());
                },
                function (err) {
                    err.statusCode = 404;
                    return actionCB(err);
                });
        } else {
            LightNovel.find({}).exec()
                .then(
                function (lightNovels) {
                    var lightNovelsArr = lightNovels.map(function (_lightNovel) {
                        return _lightNovel.toObjectNoVolumes();
                    });

                    return actionCB(null, lightNovelsArr);
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
        var lightNovel = new LightNovel({
            author: sanitizeHtml(body.author, sanitizeOptions),
            title: sanitizeHtml(body.title, sanitizeOptions),
            summary: sanitizeHtml(body.summary, sanitizeOptions)
        });
        lightNovel.save().then(
            function (lightNovel) {
                return actionCB(null, lightNovel.toObjectNoChapterText());
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
                        actionCB(null, lightNovel.toObjectNoChapterText());
                    },
                    function (err){
                        err.statusCode = 422;
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
                return actionCB(lightNovel.toObjectNoChapters());
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
                return actionCB(null, lightNovel.toObjectNoVolumes());
            }
        });
    }
};
module.exports = lightNovelService;
