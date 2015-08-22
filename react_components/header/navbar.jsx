var React = require("react");
var Navbar = React.createClass({
	test : function () {
				console.log("finally works");
		   },
	render: function () {
				return (
						<div id="navbar" onClick={this.test}>
							"Test worked!"
						</div>
					);
			}	
});

module.exports = Navbar;
