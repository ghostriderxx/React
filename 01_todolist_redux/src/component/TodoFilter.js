import React from "react"
import {connect} from "react-redux";

class TodoFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    setVisibilityFilter(filter) {
        this.props.dispatch({
            type: "SET_VISIBILITY_FILTER",
            payload: filter,
        });
    }

    render() {

        const visibilityFilter = this.props.todoapp.visibilityFilter;

        return (
            <div className={"todoapp-todofilter"}>
                <span className={"todoapp-todofilter-label"}>SHOW:</span>
                <button className={"todoapp-todofilter-btn"} style={{
                    color: visibilityFilter == "SHOW_ALL" ? "red" : "black"
                }} onClick={() => this.setVisibilityFilter("SHOW_ALL")}>All</button>
                <button className={"todoapp-todofilter-btn"} style={{
                    color: visibilityFilter == "SHOW_COMPLETED" ? "red" : "black"
                }} onClick={() => this.setVisibilityFilter("SHOW_COMPLETED")}>Completed
                </button>
                <button className={"todoapp-todofilter-btn"} style={{
                    color: visibilityFilter == "SHOW_ACTIVE" ? "red" : "black"
                }} onClick={() => this.setVisibilityFilter("SHOW_ACTIVE")}>Active
                </button>
            </div>
        );
    }
}

export default connect(
    ({todoapp}) => ({todoapp}),
    (dispatch) => ({dispatch})
)(TodoFilter)