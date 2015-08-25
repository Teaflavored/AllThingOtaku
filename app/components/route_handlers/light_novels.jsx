var React = require("react");
var getLightNovels = require("../../actions/load_light_novels");
var LightNovelList = require("../light_novels/light_novel_list.jsx");

var LightNovels = React.createClass({
	mixins: [require("fluxible").FluxibleMixin],
	statics: {
				 loadAction : getLightNovels,
				 storeListeners : ["appStore"]
			 },
	getDefaultProps: function () {
					 },
	onChange: function () {
				
			  },
	componentWillMount: function () {
							this.props.context.executeAction(getLightNovels);
						},
	render: function () {
				var store = this.props.context.getStore("appStore");
				var lightNovels = store.getLightNovels();

				return (
					<div id="lightNovels">
						<LightNovelList lightNovels={lightNovels} />
					</div>
					);
			}
});


module.exports = LightNovels;
