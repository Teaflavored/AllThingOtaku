var React = require("react");
var LightNovel = require("./light_novel.jsx");
var fluxibleAddons = require("fluxible-addons-react");
var appStore = require("../../stores/appDataStore");

var LightNovelList = React.createClass({
	getInitialState: function () {
						 return {
							 lightNovels : this.context.getStore(appStore).getLightNovels()
						 }
					 },
	contextTypes: {
					  getStore: React.PropTypes.func.isRequired
				  },
	render: function () {
				var lightNovels = this.context.getStore(appStore).getLightNovels();
				lightNovelNodes = lightNovels.map(function(lightNovel){
					return (
						<LightNovel title={lightNovel.title} author={lightNovel.author} key={lightNovel._id}/>
						);
				});

				return (
						<div className="lightNovelsList">
							{lightNovelNodes}
						</div>
					);
			}
});

LightNovelList = fluxibleAddons.connectToStores(LightNovelList, [appStore], function (context, props) {
	return {
		lightNovels: context.getStore(appStore).getLightNovels()
	};
});

module.exports = LightNovelList;

