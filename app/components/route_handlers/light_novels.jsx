var React = require("react");
var getLightNovels = require("../../actions/load_light_novels");
var fluxibleAddons = require("fluxible-addons-react");
var lightNovelStore = require("../../stores/light_novel_store");
var LightNovel = require("../light_novels/light_novel_list_item.jsx");

var LightNovels = React.createClass({
	contextTypes: {
					executeAction: React.PropTypes.func.isRequired,
					getStore: React.PropTypes.func.isRequired
				  },
	statics: {
		loadAction: getLightNovels
	},
	componentWillMount: function () {
							this.context.executeAction(getLightNovels );
						},
	render: function () {
				var lightNovels = this.context.getStore(lightNovelStore).getLightNovels();
				lightNovelNodes = lightNovels.map(function(lightNovel){
					return (
						<LightNovel lightNovel={ lightNovel  } key={lightNovel._id}/>
						);
				});

				return (
					<div id="lightNovels">
						{lightNovelNodes}
					</div>
					);
			}
});

LightNovels = fluxibleAddons.connectToStores(LightNovels, [lightNovelStore], function (context, props) {
	return {
		lightNovels: context.getStore(lightNovelStore).getLightNovels()
	};
});
module.exports = LightNovels;
