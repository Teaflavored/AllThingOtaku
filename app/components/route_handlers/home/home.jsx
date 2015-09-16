var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var Home = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="card">
                    <h1 className="text-center">Stay Tuned<br/><br /> Life of Otaku will be lauching soon!</h1>
                    <div className="text-center">Read some Light Novels <Link to="/lightNovels"> Here </Link></div>
                </div>
            </div>
        );
    }
});

module.exports = Home;
