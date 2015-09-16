var React = require("react");

var Footer = React.createClass({
    render: function () {
        return (
            <footer id="footer">
                <div className="contact-email">
                    <strong>Email: </strong>thelifeofotaku@gmail.com
                </div>
                <br />

                <div className="social-buttons">
                    <a href="https://www.facebook.com/TheLifeOfOtaku" target="_blank">
                        <i className="fa fa-facebook-square fa-2x mrm" style={footerCSS.fbBtn}></i>
                    </a>
                    <i className="fa fa-twitter-square fa-2x" style={footerCSS.twitterBtn}></i>
                </div>
            </footer>
        );
    }
});

var footerCSS = {
    fbBtn: {
        color: "#3b5998"
    },
    twitterBtn: {
        color: "#55acee"
    }
};

module.exports = Footer;
