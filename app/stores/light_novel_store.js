var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
    initialize: function () {
        this.lightNovels = [];
        this.lightNovel = {};
        this.newLightNovelErr = null;
    },
    storeName: "lightNovelStore",
    handlers: {
        LOAD_LIGHT_NOVELS: "_receiveLightNovels",
        LOAD_LIGHT_NOVELS_ERR: "_receiveLightNovelsErr",
        FIND_LIGHT_NOVEL: "_receiveLightNovel",
        FIND_LIGHT_NOVEL_ERR: "_receiveLightNovelErr",
        CREATE_LIGHT_NOVEL_ERR: "_receiveCreateLightNovelErr"
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
            newLightNovelErr: this.newLightNovelErr
        }
    },
    rehydrate: function (state) {
        this.lightNovels = state.lightNovels;
        this.lightNovel = state.lightNovel;
        this.newLightNovelErr = state.newLightNovelErr;
    }
});
