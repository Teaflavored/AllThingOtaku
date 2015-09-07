var createStore = require("fluxible/addons/createStore");

var handlers = {
    "SET_LAST_USED_VOLUME_ID": "_setLastUsedVolumeId"
};

module.exports = createStore({
    storeName: "volumeStore",
    handlers: handlers,
    initialize: function () {
        this.lastUsedVolumeId = null;
    },
    dehydrate: function () {
        return {
            lastUsedVolumeId: this.lastUsedVolumeId
        };
    },
    rehydrate: function (state) {
        this.lastUsedVolumeId = state.lastUsedVolumeId
    },
    _setLastUsedVolumeId: function (volumeId) {
        this.lastUsedVolumeId = volumeId;
    },
    getLastUsedVolumeId: function () {
        return this.lastUsedVolumeId;
    },
    isLastUsedVolume: function (volumeId) {
        return this.lastUsedVolumeId == volumeId;
    }
});