var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var LightNovelListNewItem = React.createClass({
    render: function () {
        return (
            <div className="col-sm-4 col-md-3">
                <div className="light-novel card text-center">
                    <Link to="/lightNovels/new">
                        Create New
                    </Link>
                </div>
            </div>
        );
    }
});

module.exports = LightNovelListNewItem;