var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortid = require("shortid");

var imageSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    imageId: {
        type: String,
        required: true
    },
    imageFormat: {
        type: String,
        required: true
    }
});

var Image = mongoose.model("Image", imageSchema);

module.exports = Image;
