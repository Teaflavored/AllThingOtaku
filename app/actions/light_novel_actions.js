var lightNovelActions = {
    index: function (context, payload, done) {
        context.service.read("lightNovels", {}, {}, function (err, lightNovels) {
            if (err || !lightNovels) {
                context.dispatch("LOAD_LIGHT_NOVELS_ERR", err);
            } else {
                context.dispatch("LOAD_LIGHT_NOVELS", lightNovels);
            }
            done();
        });
    },
    find: findLightNovel = function (context, payload, done) {
        context.service.read("lightNovels", payload.params, {}, function (err, lightNovel) {
            if (err || !lightNovel) {
                context.dispatch("FIND_LIGHT_NOVEL_ERR", err);
            } else {
                context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
            }
            done();
        });
    },
    create: function (context, payload, done) {
        context.service.create("lightNovels", payload.params, payload.body, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("CREATE_LIGHT_NOVEL_ERR", err);
            } else {
                var id = lightNovel._id;
                payload.component.transitionTo("lightNovelShow", {id: id});
            }
            done();
        });
    }
};

module.exports = lightNovelActions;