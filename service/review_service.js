var Review = require("../models/review");
var Image = require("../models/image");
var _ = require("lodash");
var cloudinary = require("cloudinary");
var permissions = require("../utils/user_permissions");

var reviewService = {
    name: "reviews",
    read: function (req, resource, params, config, actionCB) {
        if (params.reviewId) {
            Review.findById(params.reviewId).populate("coverImage").exec().then(
                function (review) {
                    return actionCB(null, review.toObject());
                },
                function (err) {
                    err.statusCode = 422;
                    return actionCB(err);
                }
            );
        } else {
            var queryParams = {};

            if (params.created) {
                queryParams = _.assign({}, { $lte : params.created});
            }

            Review.find(queryParams)
                .populate("coverImage")
                .sort("-created")
                .limit(10)
                .exec().then(
                    function (reviews) {
                        return actionCB(null, reviews);
                    },
                    function (err) {
                        err.statusCode = 422;
                        return actionCB(err);
                    }
            );
        }
    },
    create: function (req, resource, params, body, config, actionCB) {
        if (!req.isAuthenticated()) {
            return actionCB(new Error("No logged in user"));
        }

        if (!permissions.canCreate(req.user)) {
            return actionCB(new Error("No authentication"));
        }

        if (!body.coverImage) {
            return actionCB(new Error("Cover image is needed"));
        }

        var review = new Review({
            title: body.title,
            reviewBody: body.reviewBody
        });

        var image = body.coverImage;

        cloudinary.uploader.upload("data:image/png;base64," + image, function (result) {
            var newImage = new Image({
                imageId: result.public_id,
                imageFormat: result.format
            });

            newImage.save().then(
                function (image) {
                    review.coverImage = image._id;
                    return review.save();
                }
            ).then(
                function (review) {
                    return Review.findById(review._id).populate("coverImage").exec();
                }
            ).then(
                function (review) {
                    return actionCB(null, review.toObject());
                },
                function (err) {
                    err.statusCode = 422;
                    return actionCB(err);
                }
            )
        });
    }
};

module.exports = reviewService;