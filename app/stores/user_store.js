var createStore = require("fluxible/addons/createStore");

var handlers = {
    "USER_ERR": "_receiveUserError",
    "USER_SUCCESS": "_receiveUser"
};
module.exports = createStore({
    storeName: "userStore",
    handlers: handlers,
    initialize: function () {
        this.user = null;
        this.error = null;
    },
    dehydrate: function () {
        return {
            user: this.user
        };
    },
    rehydrate: function (state) {
        this.user = state.user;
    },
    _receiveUserError: function (err) {
        this.error = err;
        this.emitChange();
    },
    _receiveUser: function (data) {
        this.user = data;
        this.emitChange();
    },
    getError: function () {
        var error = this.error;
        this.error = null;
        return error;
    },
    getUser: function () {
        return this.user;
    }
});
