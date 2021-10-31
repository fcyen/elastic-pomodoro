import React, { Component } from "react";
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy';

import { DURATIONS } from "../constants";


class Settings extends Component {

}

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusDrt: DURATIONS.FOCUS / 60,
      restDrt: DURATIONS.REST / 60,
    };
  }

  onDurationSubmit() {
    const { focusDrt, restDrt } = this.state;

    const focusErrorMsg = document.getElementById('input-focus-error');
    const restErrorMsg = document.getElementById('input-rest-error');

    // validate values
    const validFocusDrt = (focusDrt > 0 && focusDrt <= 120);
    const validRestDrt = (restDrt > 0 && restDrt <= 60);
    focusErrorMsg.style.display = validFocusDrt ? "none": "";
    restErrorMsg.style.display = validRestDrt ? "none" : "";

    if (validFocusDrt && validRestDrt) {
      this.props.handleFocusDrtChange(focusDrt * 60);
      this.props.handleRestDrtChange(restDrt * 60);
    }
  }


  render() {
    return (
        <div id="menu">
            <button className="menu">Completed</button>
            <button className="menu">Stats</button> 
            <Tooltip
              trigger="click"
              animation="shift"
              position="bottom"
              arrow={true}
              interactive={true}
              theme="light"
              className="menu"
              style={{ cursor: "default" }}
              html={
                <div style={{ width: '180px', textAlign: "left", padding: "10px 10px 20px 10px" }}>
                  {/* Focus */}
                  <label>
                    Focus duration <br />
                    <input
                      type="number"
                      id="input-focus"
                      name="focusduration"
                      value={this.state.focusDrt}
                      onChange={v => this.setState({ focusDrt: v.target.value })}
                    />
                  </label>
                  <p 
                    id="input-focus-error"
                    style={{ fontSize: '0.8em', color: 'red', display: "none" }}
                  >
                    Invalid duration. Please enter a value between 1 and 120.
                  </p>
                  <br />
                  <br />

                  {/* Rest */}
                  <label>
                    Rest duration <br />
                    <input
                      type="number"
                      id="input-rest"
                      name="restduration"
                      value={this.state.restDrt}
                      onChange={v => this.setState({ restDrt: v.target.value })}
                    />
                  </label>
                  <p 
                    id="input-rest-error"
                    style={{ fontSize: '0.8em', color: 'red', display: "none" }}
                  >
                    Invalid duration. Please enter a value between 1 and 60.
                  </p>
                  <br />
                  <br />
                  <button onClick={() => this.onDurationSubmit()}>Submit</button>
                </div>
              }
            >
              Settings
            </Tooltip>
        </div>
    );
  }
}

export default TopNav;
