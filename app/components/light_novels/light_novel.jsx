var React = require("react");

var LightNovel = React.createClass({
	render: function () {
				return (
					<div className="lightNovel">
						<div className="title">
							{this.props.title}
						</div>
						<div className="author">
							{this.props.author}
						</div>
					</div>
				);
			}
});

module.exports = LightNovel;
