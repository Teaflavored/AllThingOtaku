var React = require("react");
var navbarCSS = require("./navbar.js.css");
// need to move the input into its own component, needs to handle auto complete and searching, can do later
var urls = ["anime", "manga", "lightNovel"];

var Navbar = React.createClass({
	render: function () {
				return (
						<div id="navbar" className="navbar navbar-fixed-top" style={navbarCSS.headerContainer}>
							<div className="container">
								<div className="navbar-header">
									<h1 style={navbarCSS.brandHeader}><a className="navbar-brand" href="/">AllThingsOtaku</a></h1>
								</div>
								<ul className="nav navbar-nav navbar-right">
									<li><a href="/lightNovels">Light Novels</a></li>
								</ul>
							</div>
						</div>
					);
	}			
});

module.exports = Navbar;
