var mongoose = require("mongoose");
var DB_URL = process.env.DB_URL;
var DB_NAME = process.env.DB_NAME;
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
var gracefulExit = function () {
    mongoose.connection.close(function () {
        console.log("Mongoose connection to " + DB_NAME + " has been closed.");
        process.exit(0);
    });
};

var connect = function (serverStartCB) {
    mongoose.connection.on("connected", function () {
        console.log("Successfully connected to DB server.");
        serverStartCB();
    });

    mongoose.connection.on("error", function () {
        console.error("Failed to connect to DB server.");
    });

    mongoose.connection.on("disconnected", function () {
        console.log("Mongoose connection to " + DB_NAME + " has been disconnected.");
    });

    try {
        mongoose.connect(process.env.MONGOLAB_URI, options);
    } catch (err) {
        console.log("Failed to initialize server", err.message);
    }
};

module.exports = connect; 
