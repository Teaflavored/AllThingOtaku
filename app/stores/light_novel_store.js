var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    initialize: function () {
        this.lightNovels = [];
        this.lightNovel = {
            volumes: []
        };
        this.volumeIdToVolumes = {};
        this.newLightNovelErr = null;
    },
    storeName: "lightNovelStore",
    handlers: {
        LOAD_LIGHT_NOVELS: "_receiveLightNovels",
        LOAD_LIGHT_NOVELS_ERR: "_receiveLightNovelsErr",
        FIND_LIGHT_NOVEL: "_receiveLightNovel",
        FIND_LIGHT_NOVEL_ERR: "_receiveLightNovelErr",
        CREATE_LIGHT_NOVEL_ERR: "_receiveCreateLightNovelErr",
        FIND_VOLUME : "_receiveVolume"
    },
    _receiveVolume: function (data) {
        this.volumeIdToVolumes[data._id] = data;
        this.emitChange();
    },
    _receiveCreateLightNovelErr: function (err) {
        this.newLightNovelErr = err;
        this.emitChange();
    },
    _receiveLightNovelErr: function (err) {
        //todo implement this
    },
    _receiveLightNovel: function (data) {
        if (data) {
            this.lightNovel = data;
            this.emitChange();
        }
    },
    _receiveLightNovelsErr: function (err) {
        //todo implement this
    },
    _receiveLightNovels: function (data) {
        this.lightNovels = data;
        this.emitChange();
    },
    getChapters: function (volumeId) {
        if (!volumeId) {
            return [];
        }

        if (this.volumeIdToVolumes[volumeId]) {
            return this.volumeIdToVolumes[volumeId].chapters;
        } else {
            return [];
        }
    },
    hasChapters: function (volumeId) {
        if (!volumeId) {
            return false;
        }

        return !!this.volumeIdToVolumes[volumeId];
    },
    getLightNovels: function () {
        return this.lightNovels;
    },
    getLightNovel: function () {
        return this.lightNovel;
    },
    getNewLightNovelErr: function () {
        //error object should be cleared once it's sent
        var error = this.newLightNovelErr;
        this.newLightNovelErr = null;
        return error;
    },
    dehydrate: function () {
        return {
            lightNovels: this.lightNovels,
            lightNovel: this.lightNovel,
            newLightNovelErr: this.newLightNovelErr,
            volumeIdToVolumes: this.volumeIdToVolumes
        }
    },
    rehydrate: function (state) {
        this.lightNovels = state.lightNovels;
        this.lightNovel = state.lightNovel;
        this.newLightNovelErr = state.newLightNovelErr;
        this.volumeIdToVolumes = state.volumeIdToVolumes;
    }
});
