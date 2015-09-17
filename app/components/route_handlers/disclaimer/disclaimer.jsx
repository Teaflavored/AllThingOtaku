var React = require("react");

var Disclaimer = React.createClass({
    render: function () {
        return (
            <div className="card">
                <h3 className="text-center">Disclaimer</h3>

                <div className="text-center">
                    Life of Otaku is a non-commercial site. No copyrighted works will be used commercially.
                </div>
                <br />

                <div className="text-center">
                    The translated works on this website is the legal property of its original copyright holder. All
                    related content will be deleted once there is an official license or at the request of the original
                    copy right holder.
                </div>
                <br />

                <div className="text-center">
                    Images are used only for the purpose of identification under fair use.
                </div>
            </div>

        );
    }
});

module.exports = Disclaimer;