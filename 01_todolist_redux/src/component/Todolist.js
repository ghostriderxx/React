import React from "react"

class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    handleInc() {
        this.setState({
            count: this.state.count + 1
        });
    }

    handleDec() {
        this.setState({
            count: this.state.count - 1
        });
    }

    render() {
        return <div>
            <h2>count:{this.state.count}</h2>
            <button onClick={() => this.handleDec()}>Dec</button>
            <button onClick={() => this.handleInc()}>Inc</button>
        </div>;
    }
}
export default Todolist;