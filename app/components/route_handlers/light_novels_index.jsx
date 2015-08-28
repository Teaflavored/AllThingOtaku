var React = require("react");
var getLightNovels = require("../../actions/load_light_novels");
var fluxibleAddons = require("fluxible-addons-react");
var lightNovelStore = require("../../stores/light_novel_store");
var LightNovel = require("../light_novels/light_novel_list_item.jsx");

var LightNovelsIndex = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
	statics: {
		loadAction: getLightNovels
	},
	componentDidMount: function () {
							this.context.executeAction(getLightNovels);
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

LightNovelsIndex = fluxibleAddons.connectToStores(LightNovelsIndex, [lightNovelStore], function (context, props) {
	return {
		lightNovels: context.getStore(lightNovelStore).getLightNovels()
	};
});
module.exports = LightNovelsIndex;
