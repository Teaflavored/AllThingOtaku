var React = require("react");
var getLightNovel = require("../../actions/find_light_novel");
var LightNovelItem = require("../light_novels/light_novel.jsx");
var lightNovelStore = require("../../stores/light_novel_store");
var fluxibleAddons = require("fluxible-addons-react");

var LightNovel = React.createClass({
	contextTypes: {
						getStore: React.PropTypes.func.isRequired,
						executeAction: React.PropTypes.func.isRequired
				  },
	componentWillMount: function () {
							this.context.executeAction(getLightNovel, {
								params: this.props.params,
								query: this.props.query 
							});
						},
	render: function () {
				var lightNovel = this.context.getStore(lightNovelStore).getLightNovel();

				return (
						<div id="lightNovel">
							<LightNovelItem lightNovel={lightNovel} />
						</div>
					);
			}
});

LightNovel = fluxibleAddons.connectToStores(LightNovel, [lightNovelStore], function(context, props) {
	return {
		lightNovel: context.getStore(lightNovelStore).getLightNovel()
	}
});

module.exports = LightNovel;
