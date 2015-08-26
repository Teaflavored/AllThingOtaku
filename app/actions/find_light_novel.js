var findLightNovel = function (context, payload, done) {
	context.service.read("lightNovels", payload.params, {}, function(err, lightNovel){
		if (err || !lightNovel) {
			context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
		} else {
			context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
		}
		done();
	});
};

module.exports = findLightNovel;
