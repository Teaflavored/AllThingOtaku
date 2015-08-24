var createStore = require("fluxible/addons/createStore");

module.exports = createStore({
	storeName: "appStore",
	handlers: {
				  LOAD_LIGHT_NOVELS : "_receiveLightNovels"
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
