var React = require("react");

var Footer = React.createClass({
    render: function () {
        return (
            <footer id="footer">
                <div className="contact-email">
                    <strong>Email: </strong>thelifeofotaku@gmail.com
                </div>
            </footer>
        );
    }
});

module.exports = Footer;
