import React, { Component } from "react";
import LeftControl from "./LeftControl";
import RightControl from "./RightControl";

export const statuses = {
  RUNNING: 0,
  PAUSED: 1,
  ENDED: 2
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: statuses.PAUSED,
      isFocusState: true,
      timeLapsed: 0, // in s
      startTime: 0 // in ms
    };
  }

  updateTimer = () => {
    const duration =
      (this.state.isFocusState
        ? this.props.focusDuration
        : this.props.restDuration) * 60;
    const timeLapsed = Math.floor((+new Date() - this.state.startTime) / 1000);

    if (this.state.status === statuses.RUNNING) {
      const isEnded = timeLapsed >= duration;
      if (isEnded) {
        this.setState({ status: statuses.ENDED });
      }
    }

    this.setState({ timeLapsed });
  };

  startTimer = () => {
    this.stopTimer();
    this.intervalID = setInterval(this.updateTimer, 1000);
  };

  stopTimer = () => {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    }
  };

  handleResume = () => {
    console.log("handleResume");
    const newStartTime = +new Date() - this.state.timeLapsed * 1000;
    this.setState({ startTime: newStartTime, status: statuses.RUNNING });
    this.startTimer();
  };

  handlePause = () => {
    console.log("handlePause");
    this.stopTimer();
    this.setState({ status: statuses.PAUSED });
  };

  handleReset = () => {
    console.log("handleReset");
    this.setState({ timeLapsed: 0, startTime: undefined });
  };

  handleDone = () => {
    console.log("handleDone");
    this.setState(prevState => {
      return {
        timeLapsed: 0,
        startTime: +new Date(),
        status: statuses.RUNNING,
        isFocusState: !prevState.isFocusState
      };
    });
    this.startTimer();
  };

  render() {
    let timerClassName = this.state.isFocusState ? "timer timer-green" : "timer timer-red";
    return (
      <div className="main">
        <h1 className={timerClassName}>{this.state.timeLapsed}</h1>
        <p className="main-currenttask">--- Current task ---</p>
        <hr></hr>
        <div className="main-controls-container">
          <LeftControl
            onPause={this.handlePause}
            onResume={this.handleResume}
            status={this.state.status}
            className="main-control-left"
          />
          <RightControl
            status={this.state.status}
            onReset={this.handleReset}
            onDone={this.handleDone}
          />
        </div>
        <p>{this.state.isFocusState ? "focus" : "rest"}</p>
      </div>
    );
  }
}

Main.defaultProps = {
  focusDuration: 0.25,
  restDuration: 0.25
};

export default Main;
