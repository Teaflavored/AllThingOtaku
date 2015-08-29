var createLightNovel = function (context, payload, done) {
    context.service.create("lightNovels", payload.params, payload.body, {}, function (err, lightNovel) {
        if (err) {
            context.dispatch("CREATE_LIGHT_NOVEL_ERR", err);
        } else {
            var id = lightNovel._id;
            payload.component.transitionTo("lightNovelShow", {id: id});
        }
        done();
    });
};

module.exports = createLightNovel;
