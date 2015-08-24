var React = require("react");
var getLightNovels = require("../../actions/load_light_novels");

var LightNovels = React.createClass({
	mixins: [require("fluxible").FluxibleMixin],
	statics: {
				 loadAction : getLightNovels,
				 storeListeners : ["appStore"]
			 },
	render: function () {
				var store = this.props.context.getStore("appStore");
				var lightNovels = store.getLightNovels();
				return (
					<div id="lightNovels">
						<div className="author">
						{lightNovels[0].author}
						</div>
					</div>
					);
			}
});


module.exports = LightNovels;
