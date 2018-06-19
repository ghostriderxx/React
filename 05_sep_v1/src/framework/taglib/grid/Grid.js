import React from "react"
import {connect} from "react-redux";

/////////////////////////////////////////////////////////////////////////////
// AntDesign
//
import {
    Table,
} from 'antd';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Frame from "../../../index"
import uuid from "../../util/UUID"
import _modelGridFactory from "./_modelGridFactory"

class Grid extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const data = this.props.grid.data;
        const localLoading = this.props.grid.loading;
        return (
            <div style={{
                padding:10,
            }}>
                <Table {...this.props} dataSource={data} loading={this.props.loading || localLoading}></Table>
            </div>
        );
    }
}


@connect(
    null,
    (dispatch) => ({dispatch}),
    null,
    {withRef:true}
)
export default class GridWarpper extends React.Component{
    constructor(props){
        super(props);

        // 给Grid分配唯一命名空间
        var namespace = uuid();

        this.state = {
            namespace
        }

        // 给Grid分配Store空间
        Frame.addModel(_modelGridFactory(namespace));

        // 给Table分配实例
        this.Instance = connect(
            (store)=>({grid: store[namespace]}),
            (dispatch) => ({dispatch}),
            null,
            {withRef:true}
        )(Grid)
    }

    componentWillMount(){
        this.props.dispatch({
            type: this.state.namespace+"/gridFillDataSuccess",
            payload: this.props.dataSource
        });
    }

    componentWillReceiveProps(nextProps){
        // 给GRID填充数据
        this.props.dispatch({
            type: this.state.namespace+"/gridFillDataSuccess",
            payload: nextProps.dataSource
        });
    }

    sort(sortby){
        this.props.dispatch({
            type: this.state.namespace+"/gridSort",
            payload:{
                sortby
            }
        });
    }

    render(){
        return (
            <this.Instance {...this.props}></this.Instance>
        );
    }
}