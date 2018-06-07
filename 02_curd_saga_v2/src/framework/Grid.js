// React、Redux、Router
import React from "react"
import {combineReducers} from "redux"
import {connect} from "react-redux";
import {withRouter} from "react-router";

//

// AntDesign
import {
    Table,
} from 'antd';

// FrameWork
import FrameApp from "../index"
import uuid from "./util/UUID"
import GridReducerFactory from "./GridReducer"
import GridSagaFactory from "./GridSaga"




class InnerGrid extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const data = this.props.grid.data;
        const localLoading = this.props.grid.loading;
        return (
            <Table {...this.props} dataSource={data} loading={this.props.loading || localLoading}></Table>
        );
    }
}




// Grid Component
class Grid extends React.Component{
    constructor(props){
        super(props);

        // 给Grid分配唯一命名空间
        var namespace = uuid();
        console.log("Gen-Grid:"+namespace);
        this.state = {
            namespace
        }

        // 给Grid分配Store空间
        FrameApp.addReducer(namespace, GridReducerFactory(namespace));

        // 给Table分配实例
        this.Grid = connect(
            (store)=>({grid: store[namespace]}),
            (dispatch) => ({dispatch}),
            null,
            {withRef:true}
        )(InnerGrid)

        // 给Grid分配Saga函数
        FrameApp.addSaga(GridSagaFactory(namespace));
    }

    componentWillMount(){
        // 给GRID填充数据
        console.log("dispatch-Grid-componentWillMount:"+this.state.namespace+"/GRID_FILL_DATA_SUCCESS");
        this.props.dispatch({
            type: this.state.namespace+"/GRID_FILL_DATA_SUCCESS",
            payload: this.props.dataSource
        });
    }

    componentWillReceiveProps(nextProps){
        // 给GRID填充数据
        console.log("dispatch-Grid-componentWillReceiveProps:"+this.state.namespace+"/GRID_FILL_DATA_SUCCESS");
        this.props.dispatch({
            type: this.state.namespace+"/GRID_FILL_DATA_SUCCESS",
            payload: nextProps.dataSource
        });
    }

    componentWillUnmount(){
        console.log("Grid.WillUnMount");
        // FrameApp.removeReducer
    }

    sort(sortby){
        this.props.dispatch({
            type: this.state.namespace+"/GRID_SORT_REQUESTED",
            payload:{
                sortby
            }
        });
    }

    filter(condition){
        this.props.dispatch({
            type: this.state.namespace+"/GRID_FILTER_REQUESTED",
            payload:{
                condition
            }
        });
    }

    render(){
        //const data = this.props.grid.data;
        return (
            <this.Grid {...this.props}></this.Grid>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({dispatch}),
    null,
    {withRef:true}
)(Grid);