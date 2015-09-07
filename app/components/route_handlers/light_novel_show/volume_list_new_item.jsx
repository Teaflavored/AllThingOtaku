var React = require("react");
var volumeActions = require("../../../actions/volume_actions");

var VolumeListNewItem = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            volumeTitle: ""
        }
    },
    handleVolumeTitleChange: function (event) {
        if (event) {
            this.setState({
                volumeTitle: event.target.value
            });
        }
    },
    handleSubmitVolumeCreate: function () {
        this.context.executeAction(volumeActions.create, {
            params: {
                lightNovelId: this.props.lightNovelId
            },
            body: {
                title: this.state.volumeTitle
            }
        });

        this.setState({
            volumeTitle: ""
        });
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <form className="row" onSubmit={this.handleSubmitVolumeCreate}
                              action="javascript:void(0);">
                            <div className="col-xs-8">
                                <input className="form-control"
                                       onChange={this.handleVolumeTitleChange}
                                       value={this.state.volumeTitle} type="text"
                                       autoComplete="off"/>
                            </div>
                            <div className="col-xs-4">
                                <button className="btn-block btn-primary btn">
                                    + Volume
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = VolumeListNewItem;