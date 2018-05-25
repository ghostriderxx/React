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

    getBtnClassName(p){
        const visibilityFilter = this.props.todoapp.visibilityFilter;
        const activeClassName = p == visibilityFilter ? "active" : "";
        return `todoapp-todofilter-btn ${activeClassName}`;
    }

    render() {
        return (
            <div className={"todoapp-todofilter"}>
                <span className={"todoapp-todofilter-label"}>
                    Filter:
                </span>

                <button className={this.getBtnClassName("SHOW_ALL")}
                        onClick={() => this.setVisibilityFilter("SHOW_ALL")}>
                    All
                </button>

                <button className={this.getBtnClassName("SHOW_COMPLETED")}
                        onClick={() => this.setVisibilityFilter("SHOW_COMPLETED")}>
                    Completed
                </button>

                <button className={this.getBtnClassName("SHOW_ACTIVE")}
                        onClick={() => this.setVisibilityFilter("SHOW_ACTIVE")}>
                    Active
                </button>
            </div>
        );
    }
}

export default connect(
    ({todoapp}) => ({todoapp}),
    (dispatch) => ({dispatch})
)(TodoFilter)