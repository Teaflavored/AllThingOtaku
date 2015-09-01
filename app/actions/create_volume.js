var createVolume = function (context, payload, done) {
    context.service.create("volumes", payload.params, payload.body, {}, function (err, lightNovel) {
        if (err) {
            context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
        } else {
            context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
        }
    });
};

module.exports = createVolume;