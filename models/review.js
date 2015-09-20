var mongoose = require("mongoose");
var shortid = require("shortid");
var Schema = mongoose.Schema;

//plugins
var created = require("./created");
var lastMod = require("./last_mod");

var reviewSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    title: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        ref: "Image",
        required: true
    },
    images: [ { type: String, ref: "Image" }]
});

reviewSchema.plugin(created);
reviewSchema.plugin(lastMod);

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;