var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
	initialize: function () {
					this.lightNovels = [];
				},
	storeName: "appStore",
	handlers: {
				  LOAD_LIGHT_NOVELS : "_receiveLightNovels",
				  LOAD_LIGHT_NOVELS_ERR : "_receiveLightNovelsErr"
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
	dehydrate: function () {

				   return {
					   data: this.lightNovels
				   }
			   },
	rehydrate: function (state) {
					this.lightNovels = state.data;
			   }

});
