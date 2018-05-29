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

class Sub2 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "CLEAR_SUB2LIST"
        });
        this.props.dispatch({
            type: "FETCH_SUB2LIST_REQUESTED"
        });
    }


    render() {
        // Modal
        const {sub2List, loading, selectedRowIndex} = this.props.sub2;

        return <Table loading={loading}
                      rowKey="yzid"
                      dataSource={sub2List}
                      onRow={(record, index) => {
                          return {
                              onClick: () => {
                                  this.props.dispatch({
                                      type:"SELECT_SUB2_ROW",
                                      payload: index
                                  });
                              },
                          };
                      }}
                      columns={[{
                          title: '项目名称',
                          dataIndex: 'xmmc',
                      }, {
                          title: '数量',
                          dataIndex: 'sl',
                      }, {
                          title: '护理级别',
                          dataIndex: 'hljb',
                      }, {
                          title: '单位',
                          dataIndex: 'dw',
                      }, {
                          title: '规格',
                          dataIndex: 'gg',
                      }, {
                          title: '单价',
                          dataIndex: 'dj',
                      }, {
                          title: '金额',
                          dataIndex: 'je',
                      },{
                          title: '执行科室',
                          dataIndex: 'zxks',
                      },{
                          title: '自付比例',
                          dataIndex: 'zfbl',
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
    ({yzMng, sub2}) => ({yzMng, sub2}),
    (dispatch) => ({dispatch})
)(Form.create()(Sub2));