var React = require("react");

//components
var VolumeListItem = require("./volume_list_item.jsx");

var VolumesList = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            listItemOpenStates: {}
        };
    },
    componentWillReceiveProps: function (nextProps) {
        var volumes = nextProps.volumes;
        var listItemOpenStates = {};

        for (var i = 0; i < volumes.length; i++) {
            listItemOpenStates[volumes[i]._id] = false;
        }

        this.setState({
            listItemOpenStates: listItemOpenStates
        });
    },
    handleOpenVolumeItem: function (event) {
        var volumeId = event.currentTarget.dataset.id,
            isOpen,
            newListItemOpenStates = {};
        for (var id in this.state.listItemOpenStates) {
            isOpen = this.state.listItemOpenStates[id];

            if (volumeId == id) {
                newListItemOpenStates[id] = !isOpen;
            } else {
                newListItemOpenStates[id] = false;
            }
        }

        this.setState({
            listItemOpenStates: newListItemOpenStates
        });
    },
    render: function () {
        var isOpen;

        var volumeNodes = this.props.volumes.map(function (volume) {
            isOpen = this.state.listItemOpenStates[volume._id];

            return (
                <VolumeListItem lightNovelId={this.props.lightNovelId} volumeId={volume._id} volume={volume}
                                isLoggedIn={this.props.isLoggedIn} key={volume._id}
                                isOpen={isOpen} onClick={this.handleOpenVolumeItem}/>
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