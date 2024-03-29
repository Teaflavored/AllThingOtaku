var React = require("react");
var ReactQuill = require("react-quill");

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterNew = React.createClass({
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
        if (this.refs.chapterTitle.getDOMNode() != document.activeElement && event.keyCode == 8) {
            event.preventDefault();
            this.props.handleCloseChapterCreate();
            return;
        }

        if (event.keyCode == 27) {
            this.props.handleCloseChapterCreate();
        }
    },
    componentDidMount: function () {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this.handleKeyDown);

        var bodyEl = document.getElementsByTagName("body")[0];
        bodyEl.classList.remove("modal-open");
    },
    handleChapterNameChange: function (event) {

        this.setState({
            chapterName: event.target.value
        });
    },
    handleChapterTextChange: function (value) {
        this.setState({
            chapterText: value
        });
    },
    handleCreateChapter: function () {
        this.context.executeAction(chapterActions.create,
            {
                params: {
                    lightNovelId: this.props.lightNovel._id,
                    volumeNum: this.props.volume.volumeNum
                },
                body: {
                    chapterName: this.state.chapterName,
                    chapterText: this.state.chapterText
                }
            });
        this.setState({
            chapterName: "",
            chapterText: ""
        });
        this.props.handleCloseChapterCreate();
    },
    render: function () {
        var newChapterNum = this.props.volume.chaptersCount + 1;
        return (
            <div id="chapterNew">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 card">
                            <h4>
                                {this.props.volume.title}, Volume {this.props.volume.volumeNum}, <span className="small">Chapter {newChapterNum}</span>
                                <a href="javascript:void(0);" className="pull-right fa fa-close"
                                   onClick={this.props.handleCloseChapterCreate}></a>
                            </h4>
                            <div className="form-group">
                                <label htmlFor="chapterTitle">Chapter Title</label>
                                <input ref="chapterTitle" onChange={this.handleChapterNameChange} type="text" className="form-control"
                                       placeholder="Optional Title"
                                       id="chapterTitle" value={this.state.chapterName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="chapterText">Chapter Text</label>
                                <ReactQuill value={this.state.chapterText}
                                            theme="snow"
                                            onChange={this.handleChapterTextChange}/>
                            </div>
                            <input type="button" className="btn btn-primary btn-block" value="Create Chapter" onClick={this.handleCreateChapter} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ChapterNew;