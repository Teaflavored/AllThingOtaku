var React = require("react");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var lightNovelStore = require("../../../stores/light_novel_store");
var authenticationStore = require("../../../stores/authentication_store");

//actions
var lightNovelActions = require("../../../actions/light_novel_actions");

//components
var LightNovel = require("./light_novel_list_item.jsx");
var LightNovelNew = require("./light_novel_list_new_item.jsx");

//utils
var permissions = require("../../../../utils/user_permissions");

var LightNovelsIndex = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    statics: {
        loadAction: lightNovelActions.index
    },
    componentDidMount: function () {
        this.context.executeAction(lightNovelActions.index);
    },
    render: function () {
        var user = this.props.user;
        var lightNovels = this.props.lightNovels;

        var lightNovelNodes = lightNovels.map(function (lightNovel) {
            return (
                <LightNovel lightNovel={ lightNovel  } key={lightNovel._id} />
            );
        });

        return (
            <div id="lightNovels">
                <div id="lightNovelList" className="row">
                    { permissions.canCreate(user) ? <LightNovelNew /> : "" }
                    {lightNovelNodes}
                </div>
            </div>
        );
    }
});

LightNovelsIndex = fluxibleAddons.connectToStores(LightNovelsIndex, [lightNovelStore, authenticationStore], function (context, props) {
    return {
        lightNovels: context.getStore(lightNovelStore).getLightNovels(),
        user : context.getStore(authenticationStore).getUser()
    };
});
module.exports = LightNovelsIndex;
