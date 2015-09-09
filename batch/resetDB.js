//connect to mongo db, drop all data, repopulate with new data
var mongoose = require("mongoose");
var DB_URL = process.env.DB_URL;

try {
    mongoose.connect(DB_URL, function () {
        mongoose.connection.db.dropDatabase();
        mongoose.connection.close();
        process.exit(0);
    });
} catch (err) {
    console.log("Failed to connect to db, " + err.message);
}
