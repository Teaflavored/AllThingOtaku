var LightNovel = require("../models/light_novel");
var _ = require("lodash");

var chapterService = {
    name: "chapters",
    read: function (req, resource, params, config, actionCB) {
        var lightNovelId = params.lightNovelId;
        var volumeId = params.volumeId;
        var chapterId = params.chapterId;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var chapter = lightNovel.volumes.id(volumeId).chapters.id(chapterId);
                return actionCB(null, chapter.toObject());
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
                volume.chapters.push(_.assign({}, body));

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