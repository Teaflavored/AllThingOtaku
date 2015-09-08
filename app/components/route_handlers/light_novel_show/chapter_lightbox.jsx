var React = require("react");
var classnames = require("classnames");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightBoxStore = require("../../../stores/lightbox_store");

//actions
var lightBoxActions = require("../../../actions/lightbox_actions");

var ChapterLightBox = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    handleCloseLightBox: function () {
        this.context.executeAction(lightBoxActions.close);
    },
    render: function () {
        var mainLBClassnames = classnames({
            "hide": !this.props.isLightBoxOpen
        });

        return (
            <div id="lightboxMain" className={mainLBClassnames}>
                <div className="container">
                    <div className="pull-right" onClick={this.handleCloseLightBox}>close</div>
                </div>
            </div>
        );
    }
});

ChapterLightBox = fluxibleAddons.connectToStores(ChapterLightBox, [lightBoxStore], function (context, props) {
    return {
        isLightBoxOpen: context.getStore(lightBoxStore).isLightBoxOpen()
    };
});

module.exports = ChapterLightBox;