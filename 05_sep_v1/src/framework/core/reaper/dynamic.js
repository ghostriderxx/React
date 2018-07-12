import React from 'react';
import {connect} from "react-redux"


const cached = {};

function registerModel(app, model) {
    model = model.default || model;
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}

let defaultLoadingComponent = () => null;

function asyncComponent(config) {
    const {resolve} = config;

    return connect()(class DynamicComponent extends React.Component {
        constructor(...args) {
            super(...args);

            this.LoadingComponent =
                config.LoadingComponent || defaultLoadingComponent;


            this.state = {
                AsyncComponent: null,
            };


            this.load();
        }

        componentDidMount() {
        }

        componentWillUnmount() {
        }

        componentDidUpdate(){
        }

        load() {
            resolve().then((m) => {
                const [model, AsyncComponent] = m;
                this.setState({
                    AsyncComponent
                });
            });
        }

        render() {
            const {AsyncComponent} = this.state;
            const {LoadingComponent} = this;
            if (AsyncComponent) return <AsyncComponent {...this.props} />;

            return <LoadingComponent {...this.props} />;
        }
    });
}


// =================================================================================
// RUI框架对模块进行了合并
// RUIModel:
//      default: UI Component
//      model: dva model
export default function dynamic(config) {
    const {app, component: resolveComponent} = config;
    return asyncComponent({
        resolve: function () {
            const component = resolveComponent();
            return new Promise((resolve) => {
                Promise.all([component]).then((ret) => {

                    const resolvedComponent = ret[0];

                    const model = resolvedComponent.model;
                    const ui = resolvedComponent.default;

                    registerModel(app, model);

                    resolve([model, ui]);
                });
            });
        },
        ...config,
    });
}

dynamic.setDefaultLoadingComponent = (LoadingComponent) => {
    defaultLoadingComponent = LoadingComponent;
};
