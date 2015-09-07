var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");
//components
var VolumeListItem = require("./volume_list_item.jsx");

//stores
var volumeStore = require("../../../stores/volume_store");

var VolumesList = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        var volumeNodes = this.props.volumes.map(function (volume) {
            return (
                <VolumeListItem lightNovelId={this.props.lightNovelId} volumeId={volume._id} volume={volume}
                                isLoggedIn={this.props.isLoggedIn} key={volume._id}
                                onClick={this.handleOpenVolumeItem}/>
            );
        }.bind(this));

        return (
            <div className="volumes-list row">
                {volumeNodes}
            </div>
        );
    }
});

module.exports = VolumesList;