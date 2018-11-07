import React from "react";
import _ from "lodash";

const style = {
    container: {width: 400, height: 400, border: "1px solid blue", overflow: "auto"},
    tall: {
        width: 100, height: 2000
    }
};

export default class DebounceScroll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        this.domRef = React.createRef();
    }

    toggleThrottle = (event)=>{
        this.setState({
            checked: event.target.checked
        })
    };

    render() {
        return (
            <div>
                <label>Enable Throttle:</label>
                <input type={"checkbox"} value={this.state.checked} onChange={this.toggleThrottle}/>
                <div style={style.container} onScroll={this.handleScroll} ref={this.domRef}>
                    <div style={style.tall}></div>
                </div>
            </div>
        );
    }

    handleScroll = (event) => {
        if(this.state.checked){
            this.logPosThrottle(this.domRef.current.scrollTop);
        }else{
            this.logPos(this.domRef.current.scrollTop);
        }
    };

    logPos = (pos) => {
        console.log(pos);
    };

    logPosThrottle = _.throttle((pos)=>{
        console.log(pos);
    }, 100);
}
