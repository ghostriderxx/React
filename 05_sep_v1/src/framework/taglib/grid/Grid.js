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
import ModelNamespaceContext from "../../context/ModelNamespaceContext"

/////////////////////////////////////////////////////////////////////////////
// ModelFactory
//
function _modelGridFactory(namespace){
    return {
        namespace,

        state: {
            data: [],
            currentRowNumber: 0,
        },

        effects: {
            * fillData({payload}, {call, put, select}) {
                yield put({
                    type: `fillDataSuccess`,
                    payload
                });
                if(payload.length > 0){
                    yield put({
                        type: `setCurrentRowNumberSuccess`,
                        payload: 1,
                    });
                }else{
                    yield put({
                        type: `setCurrentRowNumberSuccess`,
                        payload: 0,
                    });
                }
            },

            * getCurrentRow({payload}, {call, put, select}) {
                return yield select(state => state[namespace].currentRowNumber);
            },

            * getRowCount({payload}, {call, put, select}) {
                return yield select(state => state[namespace].data.length);
            },

            * getCellValue({payload}, {call, put, select}) {
                const {rowNumber, columnName} = payload;
                return yield select(state => state[namespace].data[rowNumber-1][columnName]);
            },
        },

        reducers: {
            fillDataSuccess(state, {payload}) {
                return {
                    ...state,
                    data: payload,
                };
            },

            setCurrentRowNumberSuccess(state, {payload}) {
                return {
                    ...state,
                    currentRowNumber: payload,
                };
            },
        },
    };
}


class Grid extends React.Component{
    constructor(props) {
        super(props);
    }

    //////////////////////////////////////////////////////////////////////////////////////

    componentWillMount(){

    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
    }

    //////////////////////////////////////////////////////////////////////////////////////


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
                                type: `${namespace}/setCurrentRowNumberSuccess`,
                                payload: (index+1)
                            });
                            if(onRowClick){
                                onRowClick(record);
                            }
                        },
                    };
                }} dataSource={data} loading={this.props.loading}></Table>
            </div>
        );
    }
}

Grid.displayName = "不知道这个displayName能干啥用...";

/////////////////////////////////////////////////////////////////////////////
// Component Warpper
//
class GridWarpper extends React.Component{
    constructor(props){
        super(props);

        // 给Grid分配唯一命名空间
        this.gridNamespace = `${this.props.modelNamespace}_${this.props.name}`;
        this.model = _modelGridFactory(this.gridNamespace);
    }

    //////////////////////////////////////////////////////////////////////////////////////

    componentWillMount(){
        Frame.addModel(this.model);

        const connector = connect(
            (store)=>({
                grid: store[this.gridNamespace],
                namespace: this.gridNamespace,
                loading: store.loading.global
            })
        );

        const ConnectedGrid = connector(Grid);

        this.ConnectedGrid = ConnectedGrid;
    }

    componentWillUnmount(){
        //Frame.deleteModel(this.gridNamespace);
    }

    render(){
        const columns = this.props.children.map((column) => {
            return {
                title: column.props.head,
                dataIndex: column.props.name,
            }
        });

        return (
            <this.ConnectedGrid {...this.props} columns={columns}/>
        );
    }
}

export default (props) => (
    <ModelNamespaceContext.Consumer>
        {
            ({modelNamespace}) => <GridWarpper {...props} modelNamespace={modelNamespace} />
        }
    </ModelNamespaceContext.Consumer>
);