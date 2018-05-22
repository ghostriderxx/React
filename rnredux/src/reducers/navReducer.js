import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

const navReducer = createNavigationReducer(AppNavigator);