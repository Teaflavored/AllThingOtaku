//connect to mongo db, drop all data, repopulate with new data
var mongoose = require("mongoose");
var DB_NAME = "allThingsOtaku";
var db_config = require("../config/mongo_config.js");
var LightNovel = require("../models/light_novel");
var lightNovels = require("../cache/light_novels");

var onInsert = function (err, docs) {
	if (err) {
		console.error("There was an error in inserting the documents");
	} else {
		console.log("All the stories were succesfully inserted");
	}	
	mongoose.connection.close();
	process.exit(0);
};

var lightNovelsIndex = 0;

var insertLightNovels = function () {
	if (lightNovelsIndex == lightNovels.length) {
		onInsert();
	}
	LightNovel.create(lightNovels[lightNovelsIndex], function () {
		lightNovelsIndex++;
		insertLightNovels();
	});
};

try {
	
	console.log(db_config.getDBUrl(DB_NAME));
	mongoose.connect(db_config.getDBUrl(DB_NAME), function () {
		mongoose.connection.db.dropDatabase();	
		insertLightNovels();
	});
} catch (err) {
	console.log("Failed to connect to db, " + err.message);
}
