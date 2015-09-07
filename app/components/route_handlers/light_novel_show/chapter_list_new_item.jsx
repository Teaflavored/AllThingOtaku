var React = require("react");

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterListNewItem = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            chapterName: "",
            chapterText: ""
        };
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
        return (
            <div>
                <span className="fa fa-plus" onClick=""></span>

                <div className="form-group">
                    <label htmlFor="chapterTitle">Chapter Title</label>
                    <input onChange={this.handleChapterNameChange} type="text" className="form-control"
                           id="chapterTitle" value={this.state.chapterName}/>
                </div>
                <div className="form-group">
                    <textarea className="form-control" type="text" onChange={this.handleChapterTextChange}
                              value={this.state.chapterText}></textarea>
                </div>
                <button className="btn btn-primary" type="submit" onClick={this.handleCreateChapter}>
                    Create
                </button>
            </div>
        );
    }
});

module.exports = ChapterListNewItem;
