import React from 'react';
import {connect} from "react-redux";

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Res from "../res/Res";

@connect(({lane}) => ({lane}))
export default class LaneContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const mainBeacon = this.props.mainBeacon;
        this.props.dispatch({
            type: "lane/SET_MAIN_LANE_REQUESTED",
            payload: mainBeacon,
        });
    }

    handleCloseRES(laneId) {
        this.props.dispatch({
            type: "lane/closeRES",
            payload: laneId,
        });
    }

    handleRemoveLane(laneId) {
        this.props.dispatch({
            type: "lane/removeLane",
            payload: laneId,
        });
    }

    render() {

        const {lanes, currentActiveLaneId, mainLaneId} = this.props.lane;


        return (
            <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
                {
                    lanes.map((lane) => {

                        if (lane.id == mainLaneId) {
                            return <div key={lane.id}
                                        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
                                {
                                    lane.bcn.map((Beacon) => <Beacon {...this.props}/>)
                                }
                                {
                                    lane.res.map(({component: Response, width, height}) => <Res {...this.props}>
                                            <Response width={width}
                                                      height={height}
                                            ></Response>
                                        </Res>
                                    )
                                }
                            </div>
                        } else {
                            return <div key={lane.id} style={{
                                backgroundColor: "rgba(0,0,0,.3)",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                display: (lane.id == currentActiveLaneId ? "block" : "none")
                            }}>
                                <h1 style={{textAlign: "center", marginTop: 300}}>
                                    {lane.id}
                                    <h3>
                                        <button onClick={() => this.handleRemoveLane(lane.id)}>remove</button>
                                    </h3>
                                </h1>
                            </div>
                        }


                    })
                }
            </div>
        );
    }
}
