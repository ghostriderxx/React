import React from 'react';
import {connect} from "react-redux";

@connect(({lane}) => ({lane}))
export default class FrameLaneSwitcher extends React.Component {

    componentDidMount() {
    }

    handleChangeActiveLane = (laneId) => {
        this.props.dispatch({
            type: "frameLane/setLaneActive",
            payload: laneId
        });
    }

    handleAddLane = () => {
        this.props.dispatch({
            type: "frameLane/addLane",
        });
    }

    render() {
        const {lanes, currentActiveLaneId } = this.props.frameLane;

        return (
            <div style={{backgroundColor:"grey", zIndex:9999, position:"absolute", top:0, right:0}}>
                <ul>
                {
                    lanes.map((lane, index) => {
                        return <li key={index}><button style={{backgroundColor: (currentActiveLaneId == lane.id ? "red" : "grey") }} onClick={ () => { return this.handleChangeActiveLane(lane.id) } }>
                                    {lane.id}
                                </button></li>
                    })
                }
                </ul>
                <button onClick={this.handleAddLane}>addLane</button>
            </div>
        );
    }
}

FrameLaneSwitcher.propTypes = {};
