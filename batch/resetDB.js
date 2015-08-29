//connect to mongo db, drop all data, repopulate with new data
var mongoose = require("mongoose");
var DB_NAME = "allThingsOtaku";
var db_config = require("../config/mongo_config.js");

try {
	
	console.log(db_config.getDBUrl(DB_NAME));
	mongoose.connect(db_config.getDBUrl(DB_NAME), function () {
		mongoose.connection.db.dropDatabase();
		mongoose.connection.close();
		process.exit(0);
	});
} catch (err) {
	console.log("Failed to connect to db, " + err.message);
}
