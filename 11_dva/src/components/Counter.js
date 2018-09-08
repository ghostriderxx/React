import React from 'react';

const Counter = (props) => {
    return (
        <div>
            <h2>Count: {props.counter}</h2>

            <button key="inc" onClick={() => props.dispatch({type: "counter/inc"})}>+</button>

            <button key="dec" onClick={() => props.dispatch({type: "counter/dec"})}>-</button>
        </div>
    );
};

export default Counter;