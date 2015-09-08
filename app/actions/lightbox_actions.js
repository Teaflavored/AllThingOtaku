var lightBoxActions = {
    open: function (context, payload, done) {
        context.dispatch("OPEN_LIGHTBOX");
        done();
    },
    close: function (context, payload, done) {
        context.dispatch("CLOSE_LIGHTBOX");
        done();
    }
};

module.exports = lightBoxActions;