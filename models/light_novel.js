var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var modified = require("./last_mod");
var created = require("./created");
var Volume = require("./volume");

var lightNovelSchema = new Schema({
    author: {
        type: String,
        required: "Author is required"
    },
    title: {
        type: String,
        required: "Title is required",
        index: {unique: true}
    },
    summary: String,
    publication_date: Date,
    completed: {
        type: Boolean,
        default: false,
    },
    volumes: [Volume.schema]
});

lightNovelSchema.plugin(modified);
lightNovelSchema.plugin(created);

//some custom validations
lightNovelSchema.pre("save", function (next) {
    var self = this;

    if (!this.title) {
        this.invalidate("title", "Light Novel title must be present");
        next(new Error("Title must be present"));
    }

    if (!this.author) {
        this.invalidate("author", "Light Novel author must be present");
        next(new Error("Author must be present"));
    }

    mongoose.models["LightNovel"].findOne({
        title: this.title
    }, function (err, lightNovel) {
        if (err) {
            next(err);
        } else if (lightNovel && lightNovel._id == self._id) {
            self.invalidate("title", "Light Novel title must be unique");
            next(new Error("Title must be unique"));
        } else {
            next();
        }
    });
});

var LightNovel = mongoose.model("LightNovel", lightNovelSchema);

module.exports = LightNovel;

