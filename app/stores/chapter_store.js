var createStore = require("fluxible/addons/createStore");

var ChapterStore = createStore({
    storeName: "chapterStore",
    initialize: function () {
        this.chapterIdToChapters = {

        }
    },
    dehydrate: function () {
        return {
            chapterIdToChapters : {}
        };
    },
    rehydrate: function (state) {
        this.chapterIdToChapters = state.chapterIdToChapters;
    },
    handlers: {
        FIND_CHAPTER_SUCCESS: "_findChapterSuccess",
        FIND_CHAPTER_ERR: "_findChapterErr",
        CREATE_CHAPTER_SUCCESS: "_createChapterSuccess",
        CREATE_CHAPTER_ERR: "_createChapterErr"
    },
    _findChapterSuccess: function (chapter) {
        this.chapterIdToChapters[chapter._id] = chapter;
        this.emitChange();
    },
    _createChapterSuccess: function (chapter) {
        this.chapterIdToChapters[chapter._id] = chapter;
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
    }
});

module.exports = ChapterStore;