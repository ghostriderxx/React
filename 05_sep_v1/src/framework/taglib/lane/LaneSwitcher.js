import React from 'react';
import {connect} from "react-redux";

@connect(({lane}) => ({lane}))
export default class LaneSwitcher extends React.Component {

    componentDidMount() {
    }

    handleChangeActiveLane(laneId){
        this.props.dispatch({
            type: "lane/setLaneActive",
            payload: laneId
        });
    }

    render() {
        const {lanes, currentActiveLaneId } = this.props.lane;

        return (
            <div style={{backgroundColor:"grey", zIndex:9999, position:"absolute", top:0, right:0}}>
                {
                    lanes.map((lane) => <button key={lane.id} style={{backgroundColor: (currentActiveLaneId == lane.id ? "red" : "grey") }}
                                                onClick={ () => { return this.handleChangeActiveLane(lane.id) } }>
                                            {lane.id}
                                        </button>
                    )
                }
            </div>
        );
    }
}
