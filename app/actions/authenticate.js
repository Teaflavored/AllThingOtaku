var authenticate = function (context, payload, done){
    context.service.create("authenticate", payload.params, payload.body, {}, function (err, user) {
        if (err) {
            context.dispatch("AUTHENTICATE_ERR", err);
        } else {
            payload.component.transitionTo("home");
        }
    });
};

module.exports = authenticate;