var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//plugins
var lastMod = require("./last_mod");
var created = require("./created");

//password related
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
    email: {
        type: String,
        required: "Email is required",
        index: {unique: true},

    },
    password: {
        type: String,
        required: "Password is required"
    }
});

userSchema.pre("save", function (next) {
    var self = this;
    mongoose.models["User"].findOne({
            email: this.email
        }, function (err, user) {
            if (err) {
                next(err);
            } else if (user) {
                self.invalidate("email", "That email is already in use");
                next(new Error("That E-mail is already in use"));
            } else {
                next();
            }
        }
    )
});

userSchema.pre("save", function (next) {
    var self = this;

    if (!this.isModified("password")) {
        next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            next(err);
        } else {

            bcrypt.hash(self.password, salt, function (err, hash) {
                if (err) {
                    next(err);
                } else {
                    self.password = hash;
                    next();
                }
            });
        }
    });
});

userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            callback(err);
        } else {
            callback(null, isMatch);
        }
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;

