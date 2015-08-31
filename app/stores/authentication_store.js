var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    storeName: "authenticationStore",
    handlers: {
        "AUTHENTICATE_ERR" : "_receiveAuthenticationError",
        "AUTHENTICATE_SUCCESS" : "_receiveAuthentication",
        "SIGN_OUT_ERR" : "_receiveSignOutError",
        "SIGN_OUT_SUCCESS" : "_receiveSignOut"
    },
    _receiveSignOutError : function (err) {

    },
    _receiveSignOut: function () {
        this.user = null;
        this.emitChange();
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
    },
    dehydrate: function () {
        return {
            user : this.user
        };
    },
    rehydrate: function (state) {
        this.user = state.user;
    }
});
