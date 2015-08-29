var mongoose = require("mongoose");
var dbConfig = require("./config/mongo_config");
var DB_NAME = "allThingsOtaku";

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
		mongoose.connect(dbConfig.getDBUrl(DB_NAME));
	} catch ( err )	 {
		console.log ( "Failed to initialize server", err.message );
	}
};

module.exports = connect; 
