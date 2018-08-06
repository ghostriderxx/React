import React from "react";

import {hot} from 'react-hot-loader'

@hot(module)
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bgcolor">
                Hello World!
            </div>
        );
    }
}

export default App;
