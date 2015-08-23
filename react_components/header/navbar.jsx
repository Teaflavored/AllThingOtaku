var React = require("react");
var navbarCSS = require("./navbar.js.css");
// need to move the input into its own component, needs to handle auto complete and searching, can do later
var Navbar = React.createClass({
	render: function () {
				return (
						<div id="navbar" className="navbar navbar-fixed-top" style={navbarCSS.headerContainer}>
							<div className="container">
								<div className="navbar-header">
									<h1 style={navbarCSS.brandHeader}><a className="navbar-brand" href="/">AllThingsOtaku</a></h1>
								</div>
								<input type="text" className="form-control input-lg" placeholder="Search for your favorite Anime, Manga, or Light Novels"></input>
								<ul className="">
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</div>
						</div>
					);
	}			
});

module.exports = Navbar;
