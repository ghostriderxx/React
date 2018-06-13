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
import FrameApp from "../../../index"
import uuid from "../../util/UUID"
import GridReducerFactory from "./GridReducerFactory"
import GridSagaFactory from "./GridSagaFactory"


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
        FrameApp.addReducer(namespace, GridReducerFactory(namespace));

        // 给Table分配实例
        this.Instance = connect(
            (store)=>({grid: store[namespace]}),
            (dispatch) => ({dispatch}),
            null,
            {withRef:true}
        )(Grid)

        // 给Grid分配Saga函数
        FrameApp.addSaga(GridSagaFactory(namespace));
    }

    componentWillMount(){
        this.props.dispatch({
            type: this.state.namespace+"/GRID_FILL_DATA_SUCCESS",
            payload: this.props.dataSource
        });
    }

    componentWillReceiveProps(nextProps){
        // 给GRID填充数据
        this.props.dispatch({
            type: this.state.namespace+"/GRID_FILL_DATA_SUCCESS",
            payload: nextProps.dataSource
        });
    }

    sort(sortby){
        this.props.dispatch({
            type: this.state.namespace+"/GRID_SORT_REQUESTED",
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