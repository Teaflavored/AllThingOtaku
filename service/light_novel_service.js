var LightNovel = require("../models/light_novel");
var cloudinary = require("cloudinary");

var permissions = require("../utils/user_permissions");
var _ = require("lodash");

var errorMessages = {
    "NO_AUTHENTICATION": "You have no authentication for this action"
};

var lightNovelService = {
    name: "lightNovels",
    read: function (req, resource, params, config, actionCB) {

        //default is show, load all without actual chapter text
        var editMode = config.editMode;

        if (params.lightNovelId) {
            LightNovel.findById(params.lightNovelId).exec()
                .then(
                function (lightNovel) {
                    if (editMode) {
                        return actionCB(null, lightNovel.toObjectNoVolumes());
                    } else {
                        return actionCB(null, lightNovel.toObjectNoChapterText());
                    }
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
            return actionCB(new Error("No logged in user"));
        }

        if (!permissions.canCreate(req.user)) {
            return actionCB(new Error("No permission for this action"));
        }

        var lightNovel = new LightNovel({
            author: body.author,
            title: body.title,
            summary: body.summary
        });

        var image = body.image;
        if (image) {
            cloudinary.uploader.upload("data:image/png;base64," + image, function (result) {
                lightNovel.imageId = result.public_id;
                lightNovel.imageFormat = result.format;

                lightNovel.save().then(
                    function (lightNovel) {
                        return actionCB(null, lightNovel.toObjectNoChapterText());
                    },
                    function (err) {
                        err.statusCode = 422;
                        return actionCB(err);
                    }
                );
            });
        } else {
            lightNovel.save().then(
                function (lightNovel) {
                    return actionCB(null, lightNovel.toObjectNoChapterText());
                },
                function (err) {
                    err.statusCode = 422;
                    return actionCB(err);
                }
            )
        }
    },
    update: function (req, resource, params, body, config, actionCB) {
        if (req.isUnauthenticated()) {
            return actionCB(new Error("No logged in user"));
        }

        if (!permissions.canEdit(req.user)) {
            return actionCB(new Error("No permission for this action"));
        }

        var lightNovelId = params.lightNovelId;
        var title = body.title;
        var author = body.author;
        var summary = body.summary;
        var image = body.image;

        LightNovel.findById(lightNovelId).exec().then(
            function(lightNovel) {

                lightNovel.title = title;
                lightNovel.author = author;
                lightNovel.summary = summary;

                if (image) {
                    cloudinary.uploader.upload("data:image/png;base64," + image, function (result) {
                        lightNovel.imageId = result.public_id;
                        lightNovel.imageFormat = result.format;

                        lightNovel.save().then(
                            function (lightNovel) {
                                return actionCB(null, lightNovel._id);
                            },
                            function (err) {
                                err.statusCode = 422;
                                return actionCB(err);
                            }
                        );
                    });
                }

                lightNovel.save().then(
                    function(lightNovel) {
                        actionCB(null, lightNovel._id);
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
