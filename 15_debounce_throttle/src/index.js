// react
import React from "react"
import ReactDOM from "react-dom"

// lodash
import _ from "lodash"

// css
import "./style.css"

// constants
const MAX_BAR_LENGTH = 87;
const FREQUENCY = 100;

class App extends React.Component{
    constructor(props) {
        super(props);

        this.initialized = false;

        this.interval_id = null;

        this.barLength = 0;


        this.globalColor = 2;
        this.rawColor = 0;
        this.debounceColor = 0;


        this.drawDebouncedEvent = _.debounce(this.drawDebouncedEvent, FREQUENCY*4);
        this.changeDebouncedColor = _.debounce(this.changeDebouncedColor, FREQUENCY*4);
    }

    render() {
        return (
            <div>
                <a className="trigger-area" onMouseMove={this.handleMouseMove}>Trigger area</a>
                <a className="reset" onClick={this.handleReset}> Reset </a>
                <div className="visualizations">
                    <h2>Raw events over time</h2>
                    <div id="raw-events" className="events"></div>
                    <h2>Debounced events
                        <span className="details"> 400ms, trailing</span></h2>
                    <div id="debounced-events" className="events"></div>
                </div>
            </div>
        );
    }

    drawDebouncedEvent = () => function(){
        this.debounceColor = this.globalColor;
    };

    changeDebouncedColor = () => {
        // Change colors, to visualize easier the "group of events" that is reperesenting this debounced event
        this.globalColor++;
        if (this.globalColor > 9){
            this.globalColor = 2;
        }
    };

    handleMouseMove = () => {
        if (!this.initialized) {
            this.initialized = true;
            this.draw_tick_marks();
        }
        this.rawColor = this.globalColor;
        this.drawDebouncedEvent();
        this.changeDebouncedColor();
    }

    handleReset = () =>{
        this.initialized = false;
        // $rawDiv.empty();
        // $debounceDiv.empty();

        this.barLength = 0;
        window.clearInterval(this.interval_id);
    }

    draw_tick_marks = ()=>{
        // every x seconds, draw a tick mark in the bar
        this.interval_id = window.setInterval(function(){
            this.barLength++;
            // $rawDiv.append('<span class="color' + rawColor + '" >');
            // $debounceDiv.append('<span class="color' + debounceColor + '" >');
            //
            this.rawColor = 0; // make it transparent again
            this.debounceColor = 0; // make it transparent again

            if (this.barLength > MAX_BAR_LENGTH){
                window.clearInterval(this.interval_id);
            }

        }, FREQUENCY);
    };
}

ReactDOM.render(
    <App/>
, document.getElementById("app"));
