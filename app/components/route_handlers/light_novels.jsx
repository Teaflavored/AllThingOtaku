var React = require("react");
var getLightNovels = require("../../actions/load_light_novels");
var LightNovelList = require("../light_novels/light_novel_list.jsx");

var LightNovels = React.createClass({
	contextTypes: {
					executeAction: React.PropTypes.func.isRequired,
					getStore: React.PropTypes.func.isRequired
				  },
	statics: {
				 loadAction : getLightNovels
			 },
	componentWillMount: function () {
							this.context.executeAction(getLightNovels);
						},
	render: function () {
				return (
					<div id="lightNovels">
						<LightNovelList />
					</div>
					);
			}
});

module.exports = LightNovels;
