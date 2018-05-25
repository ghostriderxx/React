import React from "react"
import {connect} from "react-redux";

@connect(({todoapp})=>({todoapp}), (dispatch)=>({dispatch}))
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
        return (
            <div>
                Show:
                <button onClick={() => this.setVisibilityFilter("SHOW_ALL")}>All</button>
                <button onClick={() => this.setVisibilityFilter("SHOW_COMPLETED")}>Completed</button>
                <button onClick={() => this.setVisibilityFilter("SHOW_ACTIVE")}>Active</button>
            </div>
        );
    }
}

export default TodoFilter;