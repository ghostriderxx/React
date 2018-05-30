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
    }

    handleTextChange(value){
        this.props.dispatch({
            type: "SET_FILTER_VAL_REQUESTED",
            payload: value,
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
                                       <Input defaultValue={text} onBlur={(e)=>{
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