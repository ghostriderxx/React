//////////////////////////////////////////////////////////////////////////////
// React、Redux
//
import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../../framework/taglib/panel/Panel";
import ResTitle from "../../../framework/taglib/res/ResTitle";
import Label from "../../../framework/taglib/form/label/Label";

class ZZDetailsGSHJ extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type');
        const zzid = this.props.navigation.getParam('zzid');

        this.props.dispatch({
            type: "zzdetails/FETCH_ZZDetails_REQUESTED",
            payload: {
                type,
                zzid,
            },
        });
    }

    render() {
        const { detaisds } = this.props.zzdetails;

        return (
            <Panel>
                <ResTitle title={"公司获奖"}/>
                {
                    detaisds.map((detail, index)=> <Panel>
                            <Label>{detail.jljb}</Label>
                            <Label>{detail.hjz}</Label>
                            <Label>{detail.dwmc}</Label>
                            <Label>{detail.hjlx}</Label>
                            <Label>{detail.hjrq}</Label>
                            <Label>{detail.yxrq}</Label>
                        </Panel>

                    )
                }
            </Panel>
        );
    }
}

export default withNavigation(connect(
    ({zzdetails}) => ({zzdetails}),
    (dispatch) => ({dispatch})
)(ZZDetailsGSHJ));