var React = require("react");
var classnames = require("classnames");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightBoxStore = require("../../../stores/lightbox_store");

var ChapterLightBox = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired
    },
    render: function () {
        var mainLBClassnames = classnames({
            "hide": !this.props.isLightBoxOpen
        });

        return (
            <div id="lightboxMain" className={mainLBClassnames}>
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