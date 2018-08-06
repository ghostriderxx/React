import React from "react";
import ReactDOM from "react-dom";

import "./style.css"

const App = (props) => {
    return (
        <div className="bgcolor">
            HelloWorld!
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);