var createUser = function (context, payload, done){
    context.service.create("users", payload.params, payload.body, {}, function (err, user) {
        if (err) {
            context.dispatch("USER_ERR", err);
        } else {
            context.dispatch("USER_SUCCESS", user);
            context.dispatch("AUTHENTICATE_SUCCESS", user);
            payload.component.transitionTo("home");
        }
        done();
    });
};

module.exports = createUser;