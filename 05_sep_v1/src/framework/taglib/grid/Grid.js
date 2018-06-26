/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from "react"
import {connect} from "react-redux";

// ## Antdesign
import {
    Table,
} from 'antd';

// ## FrameWork
import Frame from "../../../index"
import {delay} from "redux-saga";

/////////////////////////////////////////////////////////////////////////////
// ModelFactory
//
function _modelGridFactory(namespace){
    return {
        namespace,

        state: {
            data: [],
            filterCondition: null,
            currentRowNumber: 0,
        },

        subscriptions: {
            setup({dispatch, history}) {
            },
        },

        effects: {
            * gridSort({payload}, {call, put}) {
                yield delay(1000);

                yield put({
                    type: `gridSortSuccess`,
                });
            },

            * gridGetCurrentRowNumber({payload}, {call, put, select}) {
                return yield select(state => state[namespace].currentRowNumber);
            },

            * gridGetCellValue({payload}, {call, put, select}) {
                const {rowNumber, columnName} = payload;
                return yield select(state => state[namespace].data[rowNumber-1][columnName]);
            },
        },

        reducers: {
            gridFillDataSuccess(state, {payload}) {
                return {
                    ...state,
                    data: payload,
                };
            },
            gridSortSuccess(state, {payload}) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                };

            },
            setCurrentRowNumber(state, {payload}) {
                return {
                    ...state,
                    currentRowNumber: payload,
                };
            },
        },
    };
}

/////////////////////////////////////////////////////////////////////////////
// Component
//
class Grid extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const namespace = this.props.namespace;
        const data = this.props.grid.data;
        const {onRowClick, ...rest} = this.props;
        return (
            <div style={{
                padding:10,
            }}>
                <Table {...rest} onRow={(record, index) => {
                    return {
                        onClick: () => { // 点击行
                            this.props.dispatch({
                                type: `${namespace}/setCurrentRowNumber`,
                                payload: (index+1)
                            });
                            onRowClick(record);
                        },
                    };
                }} dataSource={data} loading={this.props.loading}></Table>
            </div>
        );
    }
}

/////////////////////////////////////////////////////////////////////////////
// Component Warpper
//
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
        var namespace = this.props.name;

        this.state = {
            namespace
        }

        // 给Grid分配Store空间
        Frame.addModel(_modelGridFactory(namespace));

        // 给Table分配实例
        this.Instance = connect(
            (store)=>({grid: store[namespace], namespace, loading: store.loading.global}),
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