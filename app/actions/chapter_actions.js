var chapterActions = {
    find: function (context, payload, done) {
        context.service.read("chapters", payload.params, {}, function (err, chapter) {
            if (err) {
                context.dispatch("FIND_CHAPTER_ERR", err);
            } else if (chapter) {
                context.dispatch("FIND_CHAPTER_SUCCESS", chapter);
            }
            done();
        });
    },
    create: function (context, payload, done) {
        context.service.create("chapters", payload.params, payload.body, {}, function (err, data) {
            if (err) {
                context.dispatch("CREATE_CHAPTER_ERR", err);
            } else if (data.lightNovel) {
                context.dispatch("FIND_LIGHT_NOVEL", data.lightNovel);
            }
            done();
        });
    }
};

module.exports = chapterActions;