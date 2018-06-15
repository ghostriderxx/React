import React from 'react';
import { AppRegistry } from 'react-native';

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// Saga
import createSagaMiddleware from 'redux-saga'

// Nav
import { createStackNavigator } from 'react-navigation';
// import {
//     createNavigationPropConstructor,
//     createNavigationReducer,
//     createReactNavigationReduxMiddleware,
//     initializeListeners,
// } from 'react-navigation-redux-helpers';


// Components
// 资质管理
import modelZzcc from "./src/app/office/zizhi/_modelZzcc";
import modelZztitle from "./src/app/office/zizhi/_modelZztitle";
import modelGrZztitle from "./src/app/office/zizhi/_modelGrZztitle";
import modelDetails from "./src/app/office/zizhi/_modelDetails";

import RES_REGISTRY from "./src/config/RES_REGISTRY";



/////////////////////////////////////////////////////////////////////////////
// Nav
//
const AppNavigator = createStackNavigator(RES_REGISTRY, {
    initialRouteName: 'IndexPage',
    headerMode: "none",
});

// const navReducer = createNavigationReducer(AppNavigator);
//
// const navMiddleware = createReactNavigationReduxMiddleware(
//     "root",
//     state => state.nav,
// );
//
// const navigationPropConstructor = createNavigationPropConstructor("root");

/////////////////////////////////////////////////////////////////////////////
// Saga
//
const sagaMiddleware = createSagaMiddleware();


/////////////////////////////////////////////////////////////////////////////
// Start
//
let reducers = {
    [modelZzcc.namespace]:modelZzcc.reducer,
    [modelZztitle.namespace]:modelZztitle.reducer,
    [modelGrZztitle.namespace]:modelGrZztitle.reducer,
    [modelDetails.namespace]:modelDetails.reducer,
};

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        sagaMiddleware,
        // navMiddleware,
    )
);

sagaMiddleware.run(modelZzcc.effect);
sagaMiddleware.run(modelZztitle.effect);
sagaMiddleware.run(modelGrZztitle.effect);
sagaMiddleware.run(modelDetails.effect);

/////////////////////////////////////////////////////////////////////////////

// class App extends React.Component {
//
//     componentDidMount() {
//         initializeListeners("root", this.props.nav);
//     }
//
//     render() {
//         const navigation = navigationPropConstructor(
//             this.props.dispatch,
//             this.props.nav,
//         );
//         return <AppNavigator navigation={navigation} />;
//     }
// }
//
// const AppWithNavigationState = connect(({nav}) => ({nav}))(App);

const Index = () => {
    return (
        <Provider store={store}>
            <AppNavigator/>
        </Provider>
    );
};

AppRegistry.registerComponent('rnredux', () => Index);
