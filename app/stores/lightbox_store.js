var createStore = require("fluxible/addons/createStore");

var handlers = {
    "OPEN_LIGHTBOX" : "_openLightBox",
    "CLOSE_LIGHTBOX" : "_closeLightBox"
};

var lightboxStore = createStore({
    storeName: "lightboxStore",
    handlers: handlers,
    initialize: function () {
        this.lightBoxOpen = false;
    },
    dehydrate: function () {
        return {
            lightBoxOpen: this.lightBoxOpen
        };
    },
    rehydrate: function (state) {
        this.lightBoxOpen = state.lightBoxOpen;
    },
    _openLightBox: function () {
        this.lightBoxOpen = true;
        this.emitChange();
    },
    _closeLightBox: function () {
        this.lightBoxOpen = false;
        this.emitChange();
    },
    isLightBoxOpen: function () {
        return this.lightBoxOpen;
    }
});

module.exports = lightboxStore;
