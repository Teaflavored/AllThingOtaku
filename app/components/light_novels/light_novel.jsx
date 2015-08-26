var React = require("react");

var LightNovel = React.createClass({
	render: function () {
				var title = this.props.lightNovel.title;
				return (
					<div className="light-novel-title">
						{title}
					</div>
					);
			}
});

module.exports = LightNovel;
