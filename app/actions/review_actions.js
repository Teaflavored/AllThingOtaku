var reviewActions =  {
    index: function (context, payload, done) {
        context.service.read("reviews", payload.params, {}, function (err, reviews) {
            if (err) {
                context.dispatch("FIND_REVIEWS_ERR", err);
            } else {
                context.dispatch("FIND_REVIEWS", reviews);
            }
            done();
        });
    },
    find: function (context, payload, done) {
        context.service.read("reviews", payload.params, {}, function (err, review) {
            if (err) {
                context.dispatch("FIND_REVIEW_ERR", err);
            } else {
                context.dispatch("FIND_REVIEW", review)
            }
            done();
        });
    },
    create: function (context, payload, done) {
        context.service.create("reviews", payload.params, payload.body, {}, function (err, review) {
            if (err) {
                context.dispatch("CREATE_REVIEW_ERR", err);
            } else {
                context.dispatch("FIND_REVIEW", review);
            }
            done();
        });
    }
};

module.exports = reviewActions;