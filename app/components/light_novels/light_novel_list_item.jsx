var React = require("react");
var Router = require("react-router");
var lightNovelListItemCSS = require("./light_novel_list_item.css");
var Link = Router.Link;

var LightNovel = React.createClass({
	render: function () {
				var author = this.props.lightNovel.author;
				var title = this.props.lightNovel.title;
				var id = this.props.lightNovel._id;

				return (
					<div className="lightNovel" style={lightNovelListItemCSS.lightNovelContainer}>
                        <Link to="lightNovelShow" params={ { id : id } } >
                            { title }
                        </Link>
						<div className="author">
							{ author }
						</div>
                    </div>
				);
			}
});

module.exports = LightNovel;
