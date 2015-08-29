var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;

var LightNovelNew = React.createClass({
    mixins: [Navigation],
    contextTypes: {
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
                title:  event.target.value
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
    createAction: function (context, payload, done) {
        var self = this;

        context.service.create("lightNovels", payload.params, payload.body, {}, function(err, lightNovel){
            if (err) {
            } else {
                var id = lightNovel._id;
                self.transitionTo("lightNovelShow", { id  : id });
            }
        });
    },
    handleSubmit: function () {
        this.context.executeAction(this.createAction, {
            params: {},
            body: this.state
        });
    },
    render: function () {
        return (
            <form id="lightNovelNew" action="javascript:void(0);">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" onChange={this.handleTitleFieldChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" id="author" onChange={this.handleAuthorFieldChange} />
                </div>
                <input type="button" className="btn btn-primary" onClick={this.handleSubmit} />
            </form>
        );
    }
});


module.exports = LightNovelNew;