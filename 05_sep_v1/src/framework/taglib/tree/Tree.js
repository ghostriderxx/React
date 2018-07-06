import React from 'react';
import {Tree as AntdTree} from "antd";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'

@connect(({routing})=>({
    routing
}))
export default class Tree extends React.Component {
    constructor(props) {
        super(props);
    }


    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <AntdTree.TreeNode title={<Link to={item.routePath}>{item.label}</Link>} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </AntdTree.TreeNode>
                );
            }
            return <AntdTree.TreeNode title={<Link to={item.routePath}>{item.label}</Link>} key={item.id} dataRef={item} />;
        });
    }

    render() {
        // 当前路由状态
        const currentRoutePath = this.props.routing.location.pathname;
        const matchedTreetem = this.props.treeItems.filter((item) => {
            return item.routePath == currentRoutePath
        });
        const currentSelectedTreeItemKey = matchedTreetem.length ? matchedTreetem[0].id : "";

        return (
            <AntdTree   {...this.props} selectedKeys={[currentSelectedTreeItemKey]}  >
                {this.renderTreeNodes(this.props.treeItems)}
            </AntdTree>
        );
    }
}