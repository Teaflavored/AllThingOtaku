var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    storeName: "authenticationStore",
    handlers: {

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
