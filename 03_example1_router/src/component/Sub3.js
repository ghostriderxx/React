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
    Modal,
} from 'antd';

const FormItem = Form.Item;

class Sub3 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "CLEAR_SUB3LIST"
        });
        this.props.dispatch({
            type: "FETCH_SUB3LIST_REQUESTED"
        });
    }

    render() {
        // Modal
        const {sub3List, loading, selectedRowIndex} = this.props.sub3;

        return <Table loading={loading}
                      rowKey="yzid"
                      dataSource={sub3List}
                      onRow={(record, index) => {
                          return {
                              onClick: () => {
                                  this.props.dispatch({
                                      type:"SELECT_SUB3_ROW",
                                      payload: index
                                  });
                              },
                          };
                      }}
                      columns={[{
                          title: '分组',
                          dataIndex: 'fz',
                      }, {
                          title: '分组编号',
                          dataIndex: 'fzbh',
                      }, {
                          title: '项目名称',
                          dataIndex: 'xmmc',
                      }, {
                          title: '规格',
                          dataIndex: 'gg',
                      }, {
                          title: '一次剂量',
                          dataIndex: 'ycjl',
                      }, {
                          title: '剂量单位',
                          dataIndex: 'jldw',
                      }, {
                          title: '发药数量',
                          dataIndex: 'fysl',
                      },{
                          title: '单位',
                          dataIndex: 'dw',
                      },{
                          title: '单价',
                          dataIndex: 'dj',
                      },{
                          title: '金额',
                          dataIndex: 'je',
                      },{
                          title: '虚库存',
                          dataIndex: 'xkc',
                      },{
                          title: '自付比例',
                          dataIndex: 'zfbl',
                      },{
                          title: '滴速',
                          dataIndex: 'ds',
                      },{
                          title: '备注',
                          dataIndex: 'bz',
                      },{
                          title: '记账',
                          dataIndex: 'jz',
                      },{
                          title: '删除',
                          dataIndex: 'sc',
                      },]}
        />
    }
}

export default connect(
    ({yzMng, sub3}) => ({yzMng, sub3}),
    (dispatch) => ({dispatch})
)(Form.create()(Sub3));