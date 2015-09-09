var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation;

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterNew = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            chapterName: "",
            chapterText: ""
        };
    },
    handleKeyDown: function (event) {
        console.log('hi');
        if (event.keyCode == 27) {
            this.props.handleCloseChapterCreate();
        }
    },
    componentDidMount: function () {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
    handleChapterNameChange: function (event) {
        this.setState({
            chapterName: event.target.value
        });
    },
    handleChapterTextChange: function (event) {
        this.setState({
            chapterText: event.target.value
        });
    },
    handleCreateChapter: function () {
        this.context.executeAction(chapterActions.create,
            {
                params: {
                    lightNovelId: this.props.lightNovelId,
                    volumeId: this.props.volumeId
                },
                body: {
                    chapterName: this.state.chapterName,
                    chapterText: marked(this.state.chapterText)
                }
            });
    },
    render: function () {
        var newChapterNum = this.props.volume.chaptersCount + 1;
        return (
            <div id="chapterNew">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h4>
                                {this.props.volume.title}, Volume {this.props.volume.volumeNum}, <span className="small">Chapter {newChapterNum}</span>
                                <a href="javascript:void(0);" className="pull-right fa fa-close"
                                   onClick={this.props.handleCloseChapterCreate}></a>
                            </h4>
                            <div className="form-group">
                                <label htmlFor="chapterTitle">Chapter Title</label>
                                <input onChange={this.handleChapterNameChange} type="text" className="form-control"
                                       id="chapterTitle" value={this.state.chapterName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="chapterText">Chapter Text</label>
                                <textarea className="form-control" type="text" onChange={this.handleChapterTextChange}
                                          id="chapterText"
                                          value={this.state.chapterText}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChapterNew;