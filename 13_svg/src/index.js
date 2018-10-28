import React from "react"
import ReactDOM from "react-dom"

function MySVG() {
    return (
        <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="50" width="300" height="90"
              stroke-width="3" stroke="#8e1e1e"
              fill="#efefef"/>
        </svg>
    );
}

const appContainer = document.getElementById("app");

ReactDOM.render(<MySVG/>, appContainer);
