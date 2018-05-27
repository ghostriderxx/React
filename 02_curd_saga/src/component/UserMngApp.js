import React from "react"

import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
} from 'antd';

const FormItem = Form.Item;

class UserMngApp extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }];

        return <div>




            <Form layout="inline">

                <Row type="flex" justify="space-around">
                    <Col span={12}>
                        <FormItem label={"姓名"}>
                            {
                                getFieldDecorator('userName',{})(
                                    <Input placeholder="姓名、姓名拼音、身份证号..." />
                                )
                            }
                        </FormItem>
                        <Button type="primary" icon="search">查询</Button>
                        <Button icon="rollback">清空</Button>
                    </Col>

                    <Col span={4} >
                        <Button type="primary" icon="plus-circle-o">新增</Button>
                    </Col>
                </Row>



            </Form>


            <Table dataSource={dataSource} columns={columns} />



        </div>;
    }
}

export default Form.create()(UserMngApp);