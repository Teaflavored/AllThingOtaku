var React = require("react");

var VolumeListItem = React.createClass({
    getDefaultProps: function () {
        return {
            volume: {}
        };
    },
    render: function () {
        return (
            <div className="volume-item col-xs-12">
                <div className="img-wrapper pull-left">

                </div>
                <h5>
                    { this.props.volume.title }, Volume { this.props.volume.volume_num}
                </h5>
            </div>
        );
    }
});

module.exports = VolumeListItem;
