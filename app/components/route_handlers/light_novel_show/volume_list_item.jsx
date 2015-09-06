var React = require("react");
var classnames = require("classnames");

var VolumeListItem = React.createClass({
    render: function () {
        var volumeClasses = classnames("volume-item", "card", {
            open: this.props.isOpen
        });

        var caretClasses = classnames("fa", "pull-right",{
            "fa-caret-right" : !this.props.isOpen,
            "fa-caret-down" : this.props.isOpen
        });

        return (
            <div className="col-xs-12" onClick={this.props.onClick} data-id={this.props.volume._id}>
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
