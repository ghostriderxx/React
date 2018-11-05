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





        var $rawDiv = $('#raw-events'),
            $debounceDiv = $('#debounced-events'),
            $triggerArea = $('.trigger-area'),
            initialized = false,
            globalColor = 2,
            interval_id,
            rawColor = 0,
            debounceColor = 0;





        var drawDebouncedEvent = _.debounce(function(div){
            debounceColor = globalColor;
        }, FREQUENCY*4, {leading:false, trailing:true});


        var changeDebouncedColor = _.debounce(function(div){
            // Change colors, to visualize easier the "group of events" that is reperesenting this debounced event

            globalColor++;
            if (globalColor > 9){
                globalColor = 2;
            }
        }, FREQUENCY*4, {leading:false, trailing:true});
    }

    render() {
        return (
            <div>
                <a className="trigger-area" onMouseMove={}>Trigger area</a>
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

    handleMouseMode(){
        if (!this.initialized) {
            this.initialized = true;
            draw_tick_marks();
            $(this).addClass('active');
        }
        rawColor = globalColor;
        drawDebouncedEvent();
        changeDebouncedColor();
    }

    handleReset(){
        this.initialized = false;
        $triggerArea.removeClass('active');
        $rawDiv.empty();
        $debounceDiv.empty();

        this.barLength = 0;
        window.clearInterval(this.interval_id);
    }

    draw_tick_marks = ()=>{
        // every x seconds, draw a tick mark in the bar
        this.interval_id = window.setInterval(function(){
            this.barLength++;
            $rawDiv.append('<span class="color' + rawColor + '" >');
            $debounceDiv.append('<span class="color' + debounceColor + '" >');
            rawColor = 0; // make it transparent again
            debounceColor = 0; // make it transparent again

            if (this.barLength > MAX_BAR_LENGTH){
                window.clearInterval(this.interval_id);
            }

        }, FREQUENCY);
    };
}

ReactDOM.render(
    <App/>
, document.getElementById("app"));
