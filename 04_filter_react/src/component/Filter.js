import React from "react"
import {connect} from "react-redux"

// antd
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
    Divider,
    Icon,
} from 'antd';

let cnt = 0;

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: 100
        }
    }

    handleIntervalChange(value){
        this.setState({
            interval: value
        });
    }

    handleTextChange(value){
        this.props.dispatch({
            type: "SET_FILTER_VAL_REQUESTED",
            payload: {
                filterValue:value,
                interval: this.state.interval
            },
        });
    }

    handleCellTextChange(index, cell, val){
        var newData = this.props.data.slice();
        newData[index][cell] = val;
        newData[index]["ypbh"] = (cnt++)+newData[index]["ypbh"];
        this.props.dispatch({
            type: "SET_DATA",
            payload: newData,
        });
    }

    render() {
        const FormItem = Form.Item;

        let filteredData = this.props.data.filter((one)=>{
            let ret =  one.ypbh.toUpperCase().indexOf( this.props.filterVal.toUpperCase() ) > -1;
            return ret;
        });
        filteredData = filteredData.slice(0, 50);

        return <div>
                    <Form layout={"inline"}>
                        <FormItem label="药品首码">
                            <Input
                                type="text"
                                onChange={(e)=>this.handleTextChange(e.target.value)}
                            />
                        </FormItem>

                        <FormItem label="数据总量">
                            <Input
                                type="text"
                                disabled={true}
                                value={this.props.data.length}
                            />
                        </FormItem>

                        <FormItem label="响应延时">
                            <Input
                                value={this.state.interval}
                                type="number"
                                onChange={(e)=>this.handleIntervalChange(e.target.value)}
                            />
                        </FormItem>
                    </Form>


                    <Table loading={false}
                           rowKey="ypbh"
                           dataSource={filteredData}
                           pagination={false}
                           columns={[{
                               title: '药品名称',
                               dataIndex: 'ypmc',
                           }, {
                               title: '数量',
                               dataIndex: 'sl',
                           }, {
                               title: '盘点数量',
                               dataIndex: 'ypsl',
                               render: (text, record) => (
                                   <span>
                                       <Input type={"number"} defaultValue={text} onBlur={(e)=>{
                                           this.handleCellTextChange(record.__index__, "ypsl", e.target.value);
                                       }}/>
                                   </span>
                               )
                           },{
                               title: '规格',
                               dataIndex: 'gg',
                           },{
                               title: '单位',
                               dataIndex: 'dw',
                           },{
                               title: '零售价',
                               dataIndex: 'lsj',
                           },{
                               title: '药品批号',
                               dataIndex: 'ypph',
                           },{
                               title: '有效期',
                               dataIndex: 'yxq',
                           },{
                               title: '装量',
                               dataIndex: 'hsxs',
                           },{
                               title: '进货价',
                               dataIndex: 'jhj',
                           },{
                               title: '虚拟数量',
                               dataIndex: 'xnsl',
                           },{
                               title: '库存转换数量',
                               dataIndex: 'kczhsl',
                           },{
                               title: '盘点转换数量',
                               dataIndex: 'pdzhsl',
                           },{
                               title: '供应商编号',
                               dataIndex: 'gysbh',
                           },{
                               title: '生产厂家',
                               dataIndex: 'gysmc',
                           },{
                               title: '虚实库存',
                               dataIndex: 'slcz',
                           }]}
                    />
                </div>;
    }
}
export default connect(
    ({data, filterVal})=>({data, filterVal}),
    (dispatch) => ({dispatch})
)(Filter);