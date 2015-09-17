var createStore = require("fluxible/addons/createStore");

var handlers = {
    "HANDLE_FIND_LIGHT_NOVEL_EDIT" : "receiveLightNovel",
    "HANDLE_FIND_LIGHT_NOVEL_EDIT_ERR" : "receiveLightNovelErr"
};

var lightNovelEditStore = createStore({
    storeName: "lightNovelEditStore",
    handlers: handlers,
    initialize: function () {
        this.lightNovelToEdit = null;
        this.findLightNovelErr = null;
    },
    dehydrate: function () {
        return {
            lightNovelToEdit: this.lightNovelToEdit
        };
    },
    rehydrate: function (state) {
        this.lightNovelToEdit = state.lightNovelToEdit;
    },
    receiveLightNovel: function (lightNovel) {
        this.lightNovelToEdit = lightNovel;
        this.emitChange();
    },
    receiveLightNovelErr: function (err) {
        this.findLightNovelErr = err;
        this.emitChange();
    },
    getLightNovel: function () {
        if (this.lightNovelToEdit) {
            return this.lightNovelToEdit
        }

        return {};
    },
    getLightNovelError: function () {
        var error = this.findLightNovelErr;
        this.findLightNovelErr = null;

        return error;
    }

});

module.exports = lightNovelEditStore;