var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
	initialize: function () {
					this.lightNovels = [];
					this.lightNovel = {};
				},
	storeName: "lightNovelStore",
	handlers: {
				  LOAD_LIGHT_NOVELS : "_receiveLightNovels",
				  LOAD_LIGHT_NOVELS_ERR : "_receiveLightNovelsErr",
				  FIND_LIGHT_NOVEL : "_receiveLightNovel",
				  FIND_LIGHT_NOVEL_ERR : "_receiveLightNovelErr"

			  },
	_receiveLightNovelErr : function (err) {
								//todo implement this
							},
	_receiveLightNovel: function (data) {
							if (data) {
								this.lightNovel = data;
								this.emitChange();
							}
						},
	_receiveLightNovelsErr : function (err) {
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
	dehydrate: function () {
				   return {
					   lightNovels: this.lightNovels,
					   lightNovel: this.lightNovel
				   }
			   },
	rehydrate: function (state) {
					this.lightNovels = state.lightNovels;
					this.lightNovel = state.lightNovel
			   }

});
