///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

///////////////////////////////////////////////////////////////////////////////
// App
//
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                HELLO WORLD
            </div>
        );
    }
}


///////////////////////////////////////////////////////////////////////////////
// Start
//
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);