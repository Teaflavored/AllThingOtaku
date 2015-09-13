var LightNovel = require("../models/light_novel");
var _ = require("lodash");

var errorMessages = {
    "NO_AUTHENTICATION": "You have no authentication for this action"
};

module.exports = {
    name: "volumes",
    read: function (req, resource, params, config, actionCB) {
        var lightNovelId = params.id;
        var volumeId = params.volumeId;

        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volume = lightNovel.volumes.id(volumeId);
                return actionCB(null, volume.toObject());
            },
            function (err) {
                err.statusCode = 422;
                return actionCB(err);
            }
        );
    },
    create: function (req, resource, params, body, config, actionCB) {
        if (!req.isAuthenticated()) {
            return actionCB(new Error(errorMessages["NO_AUTHENTICATION"]));
        }
        var lightNovelId = params.lightNovelId;
        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volumeNum = lightNovel.volumesCount + 1;

                lightNovel.volumes.push(_.assign({}, body, {volumeNum: volumeNum}));
                lightNovel.volumesCount = volumeNum;

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
    }
};
