var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;

//fluxible helpers
var fluxibleAddons = require("fluxible-addons-react");
//stores
var lightNovelStore = require("../../stores/light_novel_store");
//actions
var createLightNovel = require("../../actions/create_light_novel");

var LightNovelNew = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            title: "",
            author: ""
        }
    },
    handleTitleFieldChange: function (event) {
        this.setState(
            {
                title: event.target.value
            }
        )
    },
    handleAuthorFieldChange: function () {
        this.setState(
            {
                author: event.target.value
            }
        )
    },
    handleSubmit: function () {
        this.context.executeAction(createLightNovel, {
            params: {},
            body: this.state,
            component: this
        });
    },
    render: function () {
        var errorNode;
        var error = this.context.getStore(lightNovelStore).getNewLightNovelErr();
        if (error) {
            errorNode = <div className="alert-danger alert">{error.message}</div>;
        } else {
            errorNode = "";
        }
        return (
            <form id="lightNovelNew" action="javascript:void(0);">
                {errorNode}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" onChange={this.handleTitleFieldChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" id="author" onChange={this.handleAuthorFieldChange}/>
                </div>
                <input type="button" className="btn btn-primary" onClick={this.handleSubmit}/>
            </form>
        );
    }
});

LightNovelNew = fluxibleAddons.connectToStores(LightNovelNew, [lightNovelStore], function (context, props){
    return {
        error: context.getStore(lightNovelStore).getNewLightNovelErr()
    };
});
module.exports = LightNovelNew;