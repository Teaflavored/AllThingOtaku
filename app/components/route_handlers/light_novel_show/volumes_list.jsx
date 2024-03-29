var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");
//components
var VolumeListItem = require("./volume_list_item.jsx");

var VolumesList = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    render: function () {
        var self = this;

        var volumeNodes = this.props.lightNovel.volumes.map(function (volume, idx) {
            return (
                <VolumeListItem {...self.props} volume={volume}
                                                key={idx} idx={idx}/>
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