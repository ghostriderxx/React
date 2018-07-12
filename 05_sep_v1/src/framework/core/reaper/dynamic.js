import React, {Component} from 'react';

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

    return class DynamicComponent extends Component {
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
            this.mounted = true;
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        load() {
            resolve().then((m) => {
                const AsyncComponent = m.default || m;
                if (this.mounted) {
                    this.setState({AsyncComponent});
                } else {
                    this.state.AsyncComponent = AsyncComponent; // eslint-disable-line
                }
            });
        }

        render() {
            const {AsyncComponent} = this.state;
            const {LoadingComponent} = this;
            if (AsyncComponent) return <AsyncComponent {...this.props} />;

            return <LoadingComponent {...this.props} />;
        }
    };
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

                    resolve(ui);
                });
            });
        },
        ...config,
    });
}

dynamic.setDefaultLoadingComponent = (LoadingComponent) => {
    defaultLoadingComponent = LoadingComponent;
};
