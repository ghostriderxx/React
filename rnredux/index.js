import React from 'react';
import { AppRegistry } from 'react-native';

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// Saga
import createSagaMiddleware from 'redux-saga'

// Nav
import { createStackNavigator } from 'react-navigation';
import {
    createNavigationPropConstructor,
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    initializeListeners,
} from 'react-navigation-redux-helpers';


// Components
import contactListSaga from "./src/sagas/contactListSaga";
import zizhiSaga from "./src/sagas/zizhiSaga";

import contactListReducer from './src/reducers/contactListReducer';
import zizhiReducer from "./src/reducers/zizhiReducer";

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
    contactList: contactListReducer,
    zizhi: zizhiReducer,
    // nav: navReducer
};

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        sagaMiddleware,
        // navMiddleware,
    )
);

sagaMiddleware.run(contactListSaga);
sagaMiddleware.run(zizhiSaga);

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
