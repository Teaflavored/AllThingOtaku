var chapterActions = {
    find: function (context, payload, done) {
        context.service.read("chapters", payload.params, {}, function (err, data) {
            if (err) {
                context.dispatch("FIND_CHAPTER_ERR", err);
            } else if (data) {
                context.dispatch("FIND_CHAPTER_SUCCESS", data);
            }
            done();
        });
    },
    create: function (context, payload, done) {
        context.service.create("chapters", payload.params, payload.body, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("CREATE_CHAPTER_ERR", err);
            } else if (lightNovel) {
                context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
            }
            done();
        });
    },
    delete: function (context, payload, done) {
        context.service.delete("chapters", payload.params, {}, function (err, lightNovel) {
            if (err) {
                context.dispatch("DELETE_CHAPTER_ERR", err);
            } else if (lightNovel) {
                context.dispatch("FIND_LIGHT_NOVEL", lightNovel);
            }
            done();
        });
    }
};

module.exports = chapterActions;