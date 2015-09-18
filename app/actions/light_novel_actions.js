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
    find: function (context, payload, done) {
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
                var lightNovelId = lightNovel._id;
                payload.component.handleSuccessfulLightNovelCreate && payload.component.handleSuccessfulLightNovelCreate(lightNovelId);
            }
            done();
        });
    },
    findEdit: function (context, payload, done) {
        context.service.read("lightNovels", payload.params, { editMode: true }, function (err, lightNovel) {
            if (err) {
                context.dispatch("HANDLE_FIND_LIGHT_NOVEL_EDIT", err);
            } else if (lightNovel) {
                context.dispatch("HANDLE_FIND_LIGHT_NOVEL_EDIT", lightNovel);
            }
            done();
        });
    },
    update: function (context, payload, done) {
        context.service.update("lightNovels", payload.params, payload.body, {}, function (err, lightNovelId) {
            if (err) {
                context.dispatch("HANDLE_EDIT_LIGHT_NOVEL_ERR", err);
            } else if (lightNovelId) {
                payload.component && payload.component.handleSuccessfulUpdate(lightNovelId);
            }
            done();
        });
    },
    delete: function (context, payload, done) {
        context.service.delete("lightNovels", payload.params, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("HANDLE_DELETE_LIGHT_NOVEL_ERR", err);
            } else if (lightNovel) {
                payload.component && payload.component.handleSuccessfulDelete();
            }
            done();
        });
    }
};

module.exports = lightNovelActions;