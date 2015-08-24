
//connect to mongo db, drop all data, repopulate with new data
var mongoose = require("mongoose");
var DB_NAME = "allThingsOtaku";
var db_config = require("../config/mongo_config.js");
var Story = require("../models/story.js");
var stories = require("../cache/stories.js");

var onInsert = function (err, docs) {
	if (err) {
		console.error("There was an error in inserting the documents");
	} else {
		console.log("All the stories were succesfully inserted");
	}	
	mongoose.connection.close();
	process.exit(0);
};

var storiesIndex = 0;

var insertStories = function () {
	if (storiesIndex == stories.length) {
		onInsert();
	}
	Story.create(stories[storiesIndex], function () {
		storiesIndex++;
		insertStories();
	});
};

try {
	
	console.log(db_config.getDBUrl(DB_NAME));
	mongoose.connect(db_config.getDBUrl(DB_NAME), function () {
		mongoose.connection.db.dropDatabase();	
		insertStories();
	});
} catch (err) {
	console.log("Failed to connect to db, " + err.message);
}
