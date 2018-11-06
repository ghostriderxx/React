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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.initialized = false;
        this.interval_id = null;

        this.state = {
            globalColor: 2,
            rawColors: [],
            debounceColors: [],
            rawColor: 0,
            debounceColor: 0
        };

        this.barLength = 0;
    }

    render() {
        return (
            <div>
                <a className="trigger-area" onMouseMove={this.handleMouseMove}>感应区</a>
                <a className="reset" onClick={this.handleReset}>重置</a>
                <div className="visualizations">
                    <h2>原始</h2>
                    <div id="raw-events" className="events">
                        {
                            this.state.rawColors.map((rawColor, index) => (
                                <span key={index} className={`color${rawColor}`}/>
                            ))
                        }
                    </div>
                    <h2>防抖[400ms]</h2>
                    <div id="debounced-events" className="events">
                        {
                            this.state.debounceColors.map((debounceColor, index) => (
                                <span key={index} className={`color${debounceColor}`}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }

    // 绘制原始事件
    drawRawEvent = () => {
        this.setState({
            rawColor: this.state.globalColor
        });
    };

    // 绘制防抖事件
    drawDebouncedEvent = _.debounce(() => {
        this.setState({
            debounceColor: this.state.globalColor,
            // Change colors, to visualize easier the "group of events" that is reperesenting this debounced event
            globalColor: this.state.globalColor > 9 ? 2 : this.state.globalColor + 1
        });
    }, FREQUENCY * 4);

    handleMouseMove = () => {
        if (!this.initialized) {
            this.initialized = true;
            this.draw_tick_marks();
        }
        this.drawRawEvent();
        this.drawDebouncedEvent();
    };

    draw_tick_marks = () => {
        // 每间隔 FREQUENCY 毫秒，绘制一帧
        this.interval_id = window.setInterval(() => {
            this.barLength++;

            this.setState({
                rawColors: [
                    ...this.state.rawColors,
                    this.state.rawColor,
                ],
                debounceColors: [
                    ...this.state.debounceColors,
                    this.state.debounceColor,
                ],
                rawColor: 0, // make it transparent again
                debounceColor: 0, // make it transparent again
            });

            if (this.barLength > MAX_BAR_LENGTH) {
                window.clearInterval(this.interval_id);
            }

        }, FREQUENCY);
    };

    handleReset = () => {
        this.initialized = false;
        window.clearInterval(this.interval_id);
        this.interval_id = null;

        this.barLength = 0;

        this.setState({
            globalColor: 2,
            rawColors: [],
            debounceColors: [],
            rawColor: 0,
            debounceColor: 0
        });
    };
}

ReactDOM.render(
    <App/>
    , document.getElementById("app"));
