var LightNovel = require("../models/light_novel");
var _ = require("lodash");

module.exports = {
    name: "volumes",
    read: function (req, resource, params, config, actionCB) {
        var lightNovelId = params.id;
        var volumeId = params.volumeId;

        LightNovel.findById(lightNovelId, function (err, lightNovel) {
            if (err) {
                return actionCB(err);
            } else {
                if (volumeId) {
                    var volume = lightNovel.volumes.id(volumeId);
                    actionCB(null, volume);
                } else {
                    var volumes = _.pick(lightNovel.toObject(), "volumes");
                    actionCB(null, volumes);
                }
            }
        });
    },
    create: function (req, resource, params, body, config, actionCB) {
        var lightNovelId = params.id;
        LightNovel.findById(lightNovelId).exec().then(
            function (lightNovel) {
                var volumeNum = lightNovel.volumesCount + 1;

                lightNovel.volumes.push(_.assign({}, body, {volumeNum: volumeNum}));
                lightNovel.volumesCount = volumeNum;

                var promise = lightNovel.save();

                promise.then(
                    function (lightNovel) {
                        return actionCB(null, lightNovel.toObject());
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
