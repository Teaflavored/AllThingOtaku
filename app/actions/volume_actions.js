var volumeActions = {
    create: function (context, payload, done) {
        context.service.create("volumes", payload.params, payload.body, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
            } else {
                console.log(lightNovel);
                context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
            }
            done();
        });
    }
};

module.exports = volumeActions;