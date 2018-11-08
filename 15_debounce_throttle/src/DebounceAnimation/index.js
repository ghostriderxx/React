import React from "react";
import _ from "lodash";

// css
import "./style.css"

// constants
const MAX_BAR_LENGTH = 87;
const FREQUENCY = 100;

export default class DebounceAnimation extends React.Component {
    constructor(props) {
        super(props);

        this.initialized = false;
        this.interval_id = null;

        this.globalColor = 2;
        this.rawColor = 0;
        this.debounceColor = 0;

        this.barLength = 0;

        this.state = {
            leading: false,

            // 已采样的帧
            rawColors: [],
            debounceColors: [],
        };
    }

    render() {
        return (
            <div>
                <a className="trigger-area" onMouseMove={this.handleMouseMove}>感应区</a>
                <span style={{margin:"0 25px"}}>
                    <label>leading edge:</label><input type={"checkbox"} checked={this.state.leading} onChange={this.handleLeadingChange}/>
                </span>
                <button className="reset" onClick={this.handleReset}>重置</button>
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
        this.rawColor = this.globalColor;
    };

    // 绘制防抖事件
    drawDebouncedEvent = _.debounce(() => {
        this.debounceColor = this.globalColor;
    }, FREQUENCY * 4, {leading:false, trailing:true});

    // 绘制前缘防抖事件
    drawLeadingDebouncedEvent = _.debounce(() => {
        this.debounceColor = this.globalColor;
    }, FREQUENCY * 4, {leading:true, trailing:false});

    // 更换颜色，便于可视分组
    changeDebouncedColor = _.debounce(() => {
        this.globalColor = this.globalColor > 9 ? 2 : this.globalColor + 1;
    }, FREQUENCY * 4, {leading:false, trailing:true});

    handleMouseMove = () => {
        if (!this.initialized) {
            this.initialized = true;
            this.draw_tick_marks();
        }
        this.drawRawEvent();
        if(this.state.leading){
            this.drawLeadingDebouncedEvent();
        }else{
            this.drawDebouncedEvent();
        }
        this.changeDebouncedColor();
    };

    handleLeadingChange = (event) => {
        this.setState({
            leading: event.target.checked
        })
    };

    draw_tick_marks = () => {
        // 每间隔 FREQUENCY 毫秒，绘制一帧
        this.interval_id = window.setInterval(() => {
            this.barLength++;

            this.setState({
                rawColors: [
                    ...this.state.rawColors,
                    this.rawColor,
                ],
                debounceColors: [
                    ...this.state.debounceColors,
                    this.debounceColor,
                ],
            });

            this.rawColor = 0; // make it transparent again
            this.debounceColor = 0; // make it transparent again

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

        this.globalColor = 2;
        this.rawColor = 0;
        this.debounceColor = 0;

        this.setState({
            leading: false,
            rawColors: [],
            debounceColors: []
        });
    };
}
