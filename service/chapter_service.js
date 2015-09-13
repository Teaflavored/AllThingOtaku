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
                    return volume.volumeNum = params.volumeNum;
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
        var lightNovelId = params.lightNovelId;
        var volumeId = params.volumeId;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = lightNovel.volumes.id(volumeId);
                volume.chaptersCount = volume.chaptersCount + 1;

                volume.chapters.push(_.assign({}, {
                    chapterNum: volume.chaptersCount,
                    chapterText: body.chapterText
                }));

                lightNovel.save().then(
                    function (lightNovel) {
                        return actionCB(null, {
                            lightNovel: lightNovel.toObjectNoChapterText(),
                            lastUsedVolumeId: volumeId
                        });
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