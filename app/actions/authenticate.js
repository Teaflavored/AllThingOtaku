var authenticate = function (context, payload, done){
    context.service.create("authenticate", payload.params, payload.body, {}, function (err, user) {
        if (err) {
            context.dispatch("AUTHENTICATE_ERR", err);
        } else {
            context.dispatch("AUTHENTICATE_SUCCESS", user);
            payload.component.transitionTo("home");
        }
        done();
    });
};

module.exports = authenticate;