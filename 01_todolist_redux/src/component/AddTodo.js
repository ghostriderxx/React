import React from "react"
import {connect} from "react-redux";
@connect(({todoapp})=>({todoapp}), (dispatch)=>({dispatch}))
class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    textOnChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    addTodo() {
        this.props.dispatch({
            type: "ADD_TODO",
            payload: this.state.text,
        });
    }

    render() {
        return (
            <div>
                <input value={this.state.text} onChange={(e) => this.textOnChange(e)}/>
                <button onChange={() => this.addTodo()}>AddTodo</button>
            </div>
        );
    }
}

export default AddTodo;