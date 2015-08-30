var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    storeName: "authenticationStore",
    handlers: {
        "AUTHENTICATE_ERR" : "_receiveAuthenticationError",
        "AUTHENTICATE_SUCCESS" : "_receiveAuthentication"
    },
    _receiveAuthenticationError: function (err) {
        this.error = err;
        this.emitChange();
    },
    _receiveAuthentication : function (data) {
        this.user = data;
        this.emitChange();
    },
    initialize: function () {
        this.user = null;
        this.error = null;
    },
    getError: function () {
        var error = this.error;
        this.error = null;
        return error;
    },
    getUser: function () {
        return this.user;
    },
    isLoggedIn: function () {
        return !!this.user;
    }
});
