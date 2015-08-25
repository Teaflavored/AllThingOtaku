var loadLightNovels = function (context, payload, done) {
	context.service.read("lightNovels", {}, {}, function(err, lightNovels) {
		if (err || !lightNovels) {
			context.dispatch("LOAD_LIGHT_NOVELS_ERR", err);
		} else {
			context.dispatch("LOAD_LIGHT_NOVELS", lightNovels);
		}
		done();
	});
};

module.exports = loadLightNovels;
