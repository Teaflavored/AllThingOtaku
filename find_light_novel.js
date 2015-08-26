var findLightNovel = function (context, payload, done) {
	context.service.read("lightNovels", payload.params, {}, function(err, lightNovel) {
		if (err) {
			context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
		} else if (lightNovel) {
			context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
		}
		done();
	});
};

module.exports = findLightNovel;
