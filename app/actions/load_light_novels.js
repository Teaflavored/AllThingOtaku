try {
	var LightNovel = require("../../models/light_novel");
} catch (err) {

}

var loadLightNovels = function (context, payload, done) {
	if (LightNovel) {
		LightNovel.find({}, function (err, lightNovels) {
			if (err) {

			} else {
				context.dispatch("LOAD_LIGHT_NOVELS", lightNovels)
				done();
			}
		});
	} else {
		done();
	}
};

module.exports = loadLightNovels;
