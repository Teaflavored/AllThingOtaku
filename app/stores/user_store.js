var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    storeName: "userStore",
    handlers: {
        "USER_ERR" : "_receiveUserError",
        "USER_SUCCESS" : "_receiveUser"
    },
    _receiveUserError: function (err) {
        this.error = err;
        this.emitChange();
    },
    _receiveUser : function (data) {
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
    dehydrate : function () {
        return {
            user: this.user
        }
    },
    rehydrate : function (state) {
        this.user = state.user;
    }
});
