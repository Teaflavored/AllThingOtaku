var LightNovel = require("../models/light_novel");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var lightNovelService = {
    name: "lightNovels",
    read: function (req, resource, params, config, callback) {
        if (params.id) {
            LightNovel.findById(params.id, function (err, lightNovel) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, lightNovel)
                }
            });
        } else {
            LightNovel.find().lean().exec({}, function (err, lightNovels) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, lightNovels);
                }
            });
        }
    },
    create: function (req, resource, params, body, config, callback) {
        var lightNovel = new LightNovel(body);
        //may be better to move validation logic in here
        lightNovel.save(function (err) {
            if (err) {
                err.statusCode = 422;
                if (err.errors && err.errors.title) {
                        err.message = err.errors.title.message;
                        callback(err);
                } else if (err.errors && err.errors.author) {
                        err.message = err.errors.author.message;
                        callback(err);
                } else {
                    callback(err);
                }
            } else {
                callback(null, lightNovel);
            }
        });
    },
    update: function () {

    },
    delete: function () {

    }
};
module.exports = lightNovelService;
