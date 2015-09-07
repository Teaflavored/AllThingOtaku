var React = require("react");
var classnames = require("classnames");
var fluxibleAddons = require("fluxible-addons-react");

//components
var ChaptersList = require("./chapters_list.jsx");
//stores
var lightNovelStore = require("../../../stores/light_novel_store");

var VolumeListItem = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired
    },
    render: function () {
        var volumeClasses = classnames("volume-item", "card", {
            open: this.props.isOpen
        });

        var caretClasses = classnames("fa", "pull-right", "mtm", {
            "fa-caret-right": !this.props.isOpen,
            "fa-caret-down": this.props.isOpen
        });

        return (
            <div className="col-xs-12" >
                <div className={volumeClasses}>
                    <div className="volume-toggle" data-id={this.props.volume._id} onClick={this.props.onClick}>
                        <span className={caretClasses}></span>
                        <h5>
                            { this.props.volume.title }, Volume { this.props.volume.volumeNum}
                        </h5>
                    </div>
                    <ChaptersList chapters={this.props.chapters} />
                </div>
            </div>
        );
    }
});

VolumeListItem = fluxibleAddons.connectToStores(VolumeListItem, [lightNovelStore], function (context, props) {
    var chapters = context.getStore(lightNovelStore).getChapters(props.volume._id);
    chapters = chapters || [];
    return {
        chapters: chapters
    };
});

module.exports = VolumeListItem;
