var LightNovel = require("../models/light_novel");
var sanitizeHtml = require("sanitize-html");
var sanitizeOptions = require("../utils/sanitize_options");
var _ = require("lodash");

var chapterService = {
    name: "chapters",
    read: function (req, resource, params, config, actionCB) {
        var lightNovelId = params.lightNovelId;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = _.find(lightNovel.volumes, function (volume) {
                    return volume.volumeNum == params.volumeNum;
                });

                var chapter = _.find(volume.chapters, function (chapter) {
                    return chapter.chapterNum == params.chapterNum;
                });

                var result = {
                    lightNovel: lightNovel.toObjectNoVolumes(),
                    volume: volume.toObjectNoChapters(),
                    chapter: chapter.toObject()
                };

                return actionCB(null, result);
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        )
    },
    create: function (req, resource, params, body, config, actionCB) {
        if (!req.isAuthenticated()) {
           return actionCB(new Error("No Authentication"));
        }
        var lightNovelId = params.lightNovelId;
        var volumeNum = params.volumeNum;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = _.find(lightNovel.volumes, function (volume) {
                    return volume.volumeNum == volumeNum;
                });

                volume.chaptersCount = volume.chaptersCount + 1;

                volume.chapters.push(_.assign({}, {
                    chapterNum: volume.chaptersCount,
                    chapterText: body.chapterText
                }));

                lightNovel.save().then(
                    function (lightNovel) {
                        return actionCB(null, lightNovel.toObjectNoChapterText());
                    },
                    function (err) {
                        err.statusCode = 422;
                        return actionCB(err);
                    }
                )
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        )

    },
    update: function (req, resource, params, body, config, actionCB) {
        if (!req.isAuthenticated()) {
            return actionCB(new Error("No Authentication"));
        }

        var lightNovelId = params.lightNovelId;
        var volumeNum = params.volumeNum;
        var chapterNum = params.chapterNum;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = _.find(lightNovel.volumes, function (volume) {
                    return volume.volumeNum == volumeNum;
                });

                volume.chapters = _.map(volume.chapters, function (chapter) {
                    if (chapter.chapterNum == chapterNum) {
                        //update the chapter
                        return _.assign({}, chapter.toObject(), body);
                    }
                });

                lightNovel.save().then(
                    function (lightNovel) {
                        return actionCB(null, lightNovel.toObjectNoChapterText());
                    },
                    function (err) {
                        err.statusCode = 422;
                        return actionCB(err);
                    }
                );
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        );
    },
    delete: function (req, resource, params, config, actionCB) {
        if (!req.isAuthenticated()) {
            return actionCB(new Error("No Authentication"));
        }

        var lightNovelId = params.lightNovelId;
        var volumeNum = params.volumeNum;
        var chapterNum = params.chapterNum;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = _.find(lightNovel.volumes, function (volume) {
                    return volume.volumeNum == volumeNum
                });

                volume.chapters = _.filter(volume.chapters, function (chapter) {
                    return chapter.chapterNum != chapterNum;
                });

                lightNovel.save().then(
                    function(lightNovel) {
                        return actionCB(null, lightNovel);
                    },
                    function (err) {
                        err.statusCode = 422;
                        return actionCB(err);
                    }
                )
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        )
    }
};

module.exports = chapterService;