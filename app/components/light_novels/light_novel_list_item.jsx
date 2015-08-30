var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var LightNovel = React.createClass({
    render: function () {
        var author = this.props.lightNovel.author;
        var title = this.props.lightNovel.title;
        var id = this.props.lightNovel._id;

        return (
            <div className="col-sm-4 col-md-3">
                <div className="light-novel card">
                    <Link to="lightNovelShow" params={ { id : id } }>
                        { title }
                    </Link>

                    <div className="author">
                        { author }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LightNovel;
