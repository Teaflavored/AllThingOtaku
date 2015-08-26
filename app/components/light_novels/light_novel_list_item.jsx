var React = require("react");

var LightNovel = React.createClass({
	render: function () {
				var author = this.props.lightNovel.author;
				var title = this.props.lightNovel.title;
				var id = this.props.lightNovel._id;

				return (
					<div className="lightNovel">
						<div className="author">
							{ author }
						</div>
						<div className="title">
							{ title }
						</div>
					</div>
				);
			}
});

module.exports = LightNovel;
