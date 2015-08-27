var React = require("react");
var Router = require('react-router');
var navbarCSS = require("./navbar.css.js");
var Link = Router.Link;
// need to move the input into its own component, needs to handle auto complete and searching, can do later

var Navbar = React.createClass({
	render: function () {
				return (
						<div id="navbar" className="navbar navbar-fixed-top" style={navbarCSS.headerContainer}>
							<div className="container">
								<div className="navbar-header">
									<h1 style={navbarCSS.brandHeader}>
                                        <Link to="home" className="navbar-brand">
                                            AllThingsOtaku
                                        </Link>
                                    </h1>
								</div>
								<ul className="nav navbar-nav navbar-right">
									<li><Link to="lightNovelsIndex">Light Novels</Link></li>
								</ul>
							</div>
						</div>
					);
	}			
});

module.exports = Navbar;
