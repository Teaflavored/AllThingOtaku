var React = require("react");
var classnames = require("classnames");
var fluxibleAddons = require("fluxible-addons-react");

//components
var ChaptersList = require("./chapters_list.jsx");

var VolumeListItem = React.createClass({
    getInitialState: function () {
        return {
            isOpen: false
        };
    },
    handleOpenVolumeItem: function (event) {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },
    render: function () {
        var volumeClasses = classnames("volume-item", "card", {
            open: this.state.isOpen
        });

        var caretClasses = classnames("fa", "pull-right", "mtm", {
            "fa-caret-right": !this.state.isOpen,
            "fa-caret-down": this.state.isOpen
        });

        return (
            <div className="col-xs-12" >
                <div className={volumeClasses}>
                    <div className="volume-toggle" data-id={this.props.volume._id} onClick={this.handleOpenVolumeItem}>
                        <span className={caretClasses}></span>
                        <h5>
                            { this.props.volume.title }, Volume { this.props.volume.volumeNum}
                        </h5>
                    </div>
                    <ChaptersList {...this.props} />
                </div>
            </div>
        );
    }
});

module.exports = VolumeListItem;
