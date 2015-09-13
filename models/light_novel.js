var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified = require("./last_mod");
var created = require("./created");
var Volume = require("./volume");
var _ = require("lodash");
var shortid = require("shortid");

var lightNovelSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    author: {
        type: String
    },
    title: {
        type: String
    },
    volumes: [Volume.schema],
    volumesCount: {
        type: Number,
        default: 0
    },
    summary: String,
    imageId: String,
    imageFormat: String,
    pubDate: Date,
    completed: {
        type: Boolean,
        default: false
    }
});

lightNovelSchema.pre("validate", function (next) {
    if (!this.title) {
        this.invalidate("title", "Title must be present");
        next(new Error("Title is required"));
    } else if (!this.author) {
        this.invalidate("author", "Author must be present");
        next(new Error("Author is required"));
    } else {
        next();
    }
});

lightNovelSchema.pre("save", function (next) {
    var self = this;

    mongoose.models["LightNovel"]
        .findOne({
            title: this.title,
            author: this.author
        }).exec().then(function (lightNovel) {
            if (lightNovel && !lightNovel._id == self._id) {
                self.invalidate("title", "Title and Author must be unique");
                self.invalidate("author", "Title and Author must be unique");
                next(new Error("Title and Author must be unique"));
            } else {
                next();
            }
        }, function (err) {
            next(err);
        });

});

lightNovelSchema.methods.toObjectNoVolumes = function () {
    var tempLN = this.toObject();
    tempLN = _.omit(tempLN, "volumes");

    return tempLN;
};

lightNovelSchema.methods.toObjectNoChapterText = function () {
    var tempLN = this.toObject();
    tempLN.volumes = tempLN.volumes.map(function(volume) {
        volume.chapters = volume.chapters.map (function (chapter) {
            return _.omit(chapter, "chapterText");
        });

        return volume;
    });

    return tempLN;
};

lightNovelSchema.plugin(modified);
lightNovelSchema.plugin(created);

var LightNovel = mongoose.model("LightNovel", lightNovelSchema);

module.exports = LightNovel;

