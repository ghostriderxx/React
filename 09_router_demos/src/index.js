import React from "react";
import ReactDOM from "react-dom";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import {createBrowserHistory} from "history";
import {Route} from "react-router";
import {Link} from "react-router-dom"

import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from "react-router-redux";

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(middleware)
);


///////////////////////////////////////////////////////////////////////////////////////////
// Components
//
class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log("Home: constructor");
    }

    componentWillMount(){
        console.log("Home: componentWillMount");
    }

    componentWillUnmount(){
        console.log("Home: componentWillUnmount");
    }

    render() {
        console.log("Home: render");

        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

class About extends React.Component {
    constructor(props) {
        super(props);
        console.log("About: constructor");
    }

    componentWillMount(){
        console.log("About: componentWillMount");
    }

    componentWillUnmount(){
        console.log("About: componentWillUnmount");
    }

    render() {
        console.log("About: render");
        return (
            <div>
                <h2>About</h2>
            </div>
        );
    }
}

class Topics extends React.Component {
    constructor(props) {
        super(props);
        console.log("Topics: constructor");
    }

    componentWillMount(){
        console.log("Topics: componentWillMount");
    }

    componentWillUnmount(){
        console.log("Topics: componentWillUnmount");
    }

    render() {
        console.log("Topics: render");

        const {match} = this.props;
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>

                <Route path={`${match.url}/:topicId`} component={Topic}/>
                <Route
                    exact
                    path={match.url}
                    render={() => <h3>Please select a topic.</h3>}
                />
            </div>
        );
    }
}

class Topic extends React.Component {
    constructor(props) {
        super(props);
        console.log("Topic: constructor");
    }

    componentWillMount(){
        console.log("Topic: componentWillMount");
    }

    componentWillUnmount(){
        console.log("Topic: componentWillUnmount");
    }

    render() {
        console.log("Topic: render");

        const {match} = this.props;
        return (
            <div>
                <h3>{match.params.topicId}</h3>
            </div>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// Start
//
ReactDOM.render(
    <Provider store={store}>
        {/* ConnectedRouter will use the store from Provider automatically */}
        <ConnectedRouter history={history}>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
);







