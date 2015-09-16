var logout = function (context, payload, done) {
   context.service.delete("authenticate", payload.params, {}, function (err, success) {
      if (err) {
         context.dispatch("SIGN_OUT_ERR");
      } else {
         context.dispatch("SIGN_OUT_SUCCESS");
         payload.component.handleSuccessfulLogout && payload.component.handleSuccessfulLogout();
      }
      done();
   });
};

module.exports = logout;