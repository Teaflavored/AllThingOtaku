var React = require("react");
var ReactQuill = require("react-quill");
var fluxibleAddons = require("fluxible-addons-react");

//stores
var chapterStore = require("../../../stores/chapter_store");

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterEdit = React.createClass({
    contextTypes: {
        getStore: React.PropTypes.func.isRequired,
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            chapterName: "",
            chapterText: ""
        }
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.chapter) {
            this.setState({
                chapterName: nextProps.chapter.chapterName,
                chapterText: nextProps.chapter.chapterText
            });
        }
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
    handleKeyDown: function (event) {
        if (event.keyCode == 8) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (event.keyCode == 27 || event.keyCode == 8) {
            this.props.handleCloseChapterEdit();
        }
    },
    componentDidMount: function () {
        this.context.executeAction(chapterActions.find, {
            params: {
                lightNovelId: this.props.lightNovel._id,
                volumeNum: this.props.volume.volumeNum,
                chapterNum: this.props.chapterNum
            }
        });
        window.addEventListener("keydown", this.handleKeyDown);
    },
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this.handleKeyDown);

        var bodyEl = document.getElementsByTagName("body")[0];
        bodyEl.classList.remove("modal-open");
    },
    handleSaveChapter: function () {
        this.context.executeAction(chapterActions.update, {
            params: {
                lightNovelId: this.props.lightNovel._id,
                volumeNum: this.props.volume.volumeNum,
                chapterNum: this.props.chapterNum
            },
            body: this.state
        });

        this.setState({
            chapterName: "",
            chapterText: ""
        });

        this.props.handleCloseChapterEdit();
    },
    render: function () {
        return (
            <div id="chapterNew">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 card">
                            <h4>
                                {this.props.volume.title}, Volume {this.props.volume.volumeNum}, <span
                                className="small">Chapter {this.props.chapterNum}</span>
                                <a href="javascript:void(0);" className="pull-right fa fa-close"
                                   onClick={this.props.handleCloseChapterEdit}></a>
                            </h4>

                            <div className="form-group">
                                <label htmlFor="chapterTitle">Chapter Title</label>
                                <input onChange={this.handleChapterNameChange} type="text" className="form-control"
                                       placeholder="Optional Title"
                                       id="chapterTitle" value={this.state.chapterName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="chapterText">Chapter Text</label>
                                <ReactQuill value={this.state.chapterText}
                                            theme="snow"
                                            onChange={this.handleChapterTextChange}/>
                            </div>
                            <input type="button" className="btn btn-primary btn-block" value="Edit Chapter"
                                   onClick={this.handleSaveChapter}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

ChapterEdit = fluxibleAddons.connectToStores(ChapterEdit, [chapterStore], function (context, props) {
    return {
        chapter: context.getStore(chapterStore).getChapter(props.lightNovel._id)
    };
});

module.exports = ChapterEdit;