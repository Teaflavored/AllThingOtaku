var createStore = require("fluxible/addons/createStore");

var handlers = {
    FIND_CHAPTER_SUCCESS: "_findChapterSuccess",
    FIND_CHAPTER_ERR: "_findChapterErr",
    CREATE_CHAPTER_ERR: "_createChapterErr"
};

var ChapterStore = createStore({
    storeName: "chapterStore",
    handlers: handlers,
    initialize: function () {
        this.lightNovelIdToData = {

        };
    },
    dehydrate: function () {
        return {
            lightNovelIdToData: this.lightNovelIdToData
        };
    },
    rehydrate: function (state) {
        this.lightNovelIdToData = state.lightNovelIdToData;
    },
    _findChapterSuccess: function (data) {
        this.lightNovelIdToData[data.lightNovel._id] = data;
        this.emitChange();
    },
    _findChapterErr: function (err) {

    },
    _createChapterErr: function (err) {

    },
    getChapter: function (lightNovelId) {
        if (!lightNovelId) {
            return {};
        }

        var chapterData = this.lightNovelIdToData[lightNovelId];
        return chapterData ? chapterData.chapter : {};
    },
    getVolume: function (lightNovelId) {
        if (!lightNovelId) {
            return {};
        }

        var chapterData = this.lightNovelIdToData[lightNovelId];
        return chapterData ? chapterData.volume : {};
    },
    getLightNovel: function (lightNovelId) {
        if (!lightNovelId) {
            return {};
        }

        var chapterData = this.lightNovelIdToData[lightNovelId];
        return chapterData ? chapterData.lightNovel : {};
    }
});

module.exports = ChapterStore;