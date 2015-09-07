var createStore = require("fluxible/addons/createStore");

var handlers = {
    "OPEN_LIGHT_BOX" : "_openLightBox",
    "CLOSE_LIGHT_BOX" : "_closeLightBox"
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
