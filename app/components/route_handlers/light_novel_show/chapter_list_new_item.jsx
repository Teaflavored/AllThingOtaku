var React = require("react");

//actions
var chapterActions = require("../../../actions/chapter_actions");

var ChapterListNewItem = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },
    getInitialState: function () {
        return {
            chapterName: ""
        };
    },
    handleChapterTextChange: function (event) {
        this.setState({
            chapterName: event.target.value
        });
    },
    handleCreateChapter: function () {
        this.context.executeAction(chapterActions.create,
            {
                params: {
                    lightNovelId: this.props.lightNovelId,
                    volumeId: this.props.volumeId
                },
                body: this.state
            });
    },
    render: function () {
        return (
            <div>
                <span className="fa fa-plus" onClick=""></span>
                <input onChange={this.handleChapterTextChange} className="form-control" value={this.state.chapterName}/>
                <button className="btn btn-primary" type="submit" onClick={this.handleCreateChapter}>Create</button>
            </div>
        );
    }
});

module.exports = ChapterListNewItem;
