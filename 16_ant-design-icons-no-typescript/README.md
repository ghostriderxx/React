
# Ant design icons no TypeScript

## 1. 背景

学习、研究、参考 Ant Design 中的 Icon 管理机制

主要参考：

* ant-design-icons 1.1.15
* ant-design 3.10.7

主要修改：

* 去除了 TypeScript，使用 ES6 编写代码；
* 去除了 RxJS，使用 Promise 组织异步；
* 去除了 rc-tool，改用 webpack 打包；

## 2. 各子项目间关系

* @rui/icons：维护所有 svg 图标，并导出 svg 定义；
* @rui/icons-react：能够通过 svg 定义渲染出 svg 图标；
* @rui/icon：整合 @rui/icons、@rui/icons-react，对开发人员提供接口；
