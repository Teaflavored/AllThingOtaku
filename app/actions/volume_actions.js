var volumeActions = {
    create: function (context, payload, done) {
        context.service.create("volumes", payload.params, payload.body, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
            } else {
                context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
            }
            done();
        });
    },
    read: function (context, payload, done) {
        context.service.read("volumes", payload.params, {}, function (err, volume) {
            if (err) {
                context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
            } else {
                context.dispatch("FIND_VOLUME", volume);
            }
            payload.callback();
        });
        done();
    }
};

module.exports = volumeActions;