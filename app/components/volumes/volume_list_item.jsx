var React = require("react");
var classnames = require("classnames");

var VolumeListItem = React.createClass({
    getInitialState: function () {
        return {
            isOpen: this.props.isOpen
        };
    },
    handleOpenVolumeItem: function (e) {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },
    render: function () {
        var volumeClasses = classnames("volume-item", "card", {
            open: this.state.isOpen
        });

        var caretClasses = classnames("fa", "pull-right",{
            "fa-caret-right" : !this.state.isOpen,
            "fa-caret-down" : this.state.isOpen
        });

        return (
            <div className="col-xs-12" onClick={this.handleOpenVolumeItem}>
                <div className={volumeClasses}>
                    <div className="">
                        <span className={caretClasses}></span>
                    </div>
                    <h5>
                        { this.props.volume.title }, Volume { this.props.volume.volumeNum}
                    </h5>
                </div>
            </div>
        );
    }
});

module.exports = VolumeListItem;
