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
        this.chapterIdToChapters = {};
        this.volumeIdToVolumes = {};
        this.lightNovelIdToLightNovels ={};
    },
    dehydrate: function () {
        return {
            chapterIdToChapters: this.chapterIdToChapters,
            volumeIdToVolumes: this.volumeIdToVolumes,
            lightNovelIdToLightNovels: this.lightNovelIdToLightNovels
        };
    },
    rehydrate: function (state) {
        this.chapterIdToChapters = state.chapterIdToChapters;
        this.volumeIdToVolumes = state.volumeIdToVolumes;
        this.lightNovelIdToLightNovels = state.lightNovelIdToLightNovels;
    },
    _findChapterSuccess: function (data) {
        this.chapterIdToChapters[data.chapter._id] = data.chapter;
        this.volumeIdToVolumes[data.volume._id] = data.volume;
        this.lightNovelIdToLightNovels[data.lightNovel._id] = data.lightNovel;
        this.emitChange();
    },
    _findChapterErr: function (err) {

    },
    _createChapterErr: function (err) {

    },
    hasChapter: function (chapterId) {
        if (!chapterId) {
            return false;
        }

        if (typeof chapterId == "string") {
            return this.chapterIdToChapters[chapterId];
        }

        return false;
    },
    getChapter: function (chapterId) {
        if (!chapterId) {
            return {};
        }

        var chapter = this.chapterIdToChapters[chapterId];
        return ( chapter ? (chapter) : ( {} ) );
    },
    getVolume: function (volumeId) {
        if (!volumeId) {
            return {};
        }

        var volume = this.volumeIdToVolumes[volumeId];
        return ( volume ? (volume) : ( {} ));
    },
    getLightNovel: function (lightNovelId) {
        if (!lightNovelId) {
            return {};
        }

        var lightNovel = this.lightNovelIdToLightNovels[lightNovelId];
        return ( lightNovel ? (lightNovel) : ( {} ));
    }
});

module.exports = ChapterStore;