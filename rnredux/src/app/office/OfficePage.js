//////////////////////////////////////////////////////////////////////////////
// React
//
import React from 'react';
import { withNavigation } from 'react-navigation';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../framework/taglib/panel/Panel";
import Badge from "../../framework/taglib/badge/Badge";

//////////////////////////////////////////////////////////////////////////////
// Component
//
import TopTitle from "../common/toptitle/TopTitle";


class OfficePage extends React.Component {
    constructor(props){
        super(props);
    }

    gotoBaogong(){
        this.props.navigation.navigate("Baogong");
    }

    gotoZizhi(){
        this.props.navigation.navigate("Zzcx");
    }

    render(){
        return (
            <Panel>
                {/** 标题 **/}
                <TopTitle>办公</TopTitle>

                {/** 工作 **/}
                <Panel>
                    <Badge title={"工作"}>
                        <Badge.BadgeItem label={"报工"} iconId={"logo-github"} onPress={ ()=> this.gotoBaogong() }></Badge.BadgeItem>
                        <Badge.BadgeItem label={"会议室"} iconId={"ios-cafe"} ></Badge.BadgeItem>
                        <Badge.BadgeItem label={"报工"} iconId={"logo-github"} ></Badge.BadgeItem>
                        <Badge.BadgeItem label={"报工"} iconId={"logo-github"} ></Badge.BadgeItem>
                    </Badge>
                </Panel>

                {/** 管理 **/}
                <Panel>
                    <Badge title={"管理"}>
                        <Badge.BadgeItem label={"资质"} iconId={"ios-headset"} onPress={ ()=> this.gotoZizhi() }></Badge.BadgeItem>
                        <Badge.BadgeItem label={"请假"} iconId={"ios-umbrella"} ></Badge.BadgeItem>
                        <Badge.BadgeItem label={"加班车"} iconId={"ios-bus"} ></Badge.BadgeItem>
                        <Badge.BadgeItem label={"培训计划"} iconId={"ios-ionitron"} ></Badge.BadgeItem>
                    </Badge>
                </Panel>
            </Panel>
        );
    }
}

export default withNavigation(OfficePage);