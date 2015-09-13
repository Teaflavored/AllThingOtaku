var createStore = require("fluxible/addons/createStore");

var handlers = {
    "FIND_VOLUME_SUCCESS": "_findVolumeSuccess"
};

module.exports = createStore({
    storeName: "volumeStore",
    handlers: handlers,
    initialize: function () {
        this.volumeIdToVolume = {};
    },
    dehydrate: function () {
        return {
            volumeIdToVolume: this.volumeIdToVolume
        };
    },
    rehydrate: function (state) {
        this.volumeIdToVolume = state.volumeIdToVolume;
    },
    _findVolumeSuccess: function (volume) {
        if (volume) {
            this.volumeIdToVolume[volume._id] = volume;
        }
        this.emitChange();
    },
    getVolume: function (volumeId) {
        return this.volumeIdToVolume[volumeId];
    }
});