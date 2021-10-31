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
      startTime: 0, // in ms
      restDuration: props.restDuration,
    };
  }

  // ---------------------------
  // helper functions
  // ---------------------------

  notify = msg => {
    if (!window.Notification) {
      console.log('Browser does not support notifications.');
    } 
    else {
      if (Notification.permission === 'granted') {  // check if permission is already granted
        let notify = new Notification(msg);
      } 
      else {
        Notification.requestPermission().then(p => {  // request permission from user
          if (p === 'granted') {
            let notify = new Notification(msg);
          } else {
            console.log('User blocked notifications.');
          }
        }).catch(err => {
          console.error(err);
        });
      }
    }
  }

  parseTime = tSecs => {
    const mins = Math.floor(tSecs / 60).toString();
    const secs = Math.floor(tSecs % 60).toString();
    
    return mins.padStart(2, '0') + ":" + secs.padStart(2, '0');
  }
  

  // ---------------------------
  // event handling functions
  // ---------------------------
  
  updateTimer = () => {
    let timeLapsed;
    
    // focus state
    // - counts up
    // - when times up: change status to ENDED, continue counting
    if (this.state.isFocusState) {
      timeLapsed = Math.floor((+new Date() - this.state.startTime) / 1000);

      if (this.state.status === statuses.RUNNING) {
        const isEnded = timeLapsed >= this.props.focusDuration;
        if (isEnded) {
          document.title = "Time's Up!";
          this.notify("Time to rest :)");
          this.setState({ status: statuses.ENDED });
        }
      }
      this.setState({ timeLapsed });
    }

    // rest state
    // - counts down
    // - when times up: change status to ENDED, stop counting
    else {
      if (this.state.status !== statuses.ENDED) {
        timeLapsed = this.state.restDuration - Math.floor((+new Date() - this.state.startTime) / 1000);
        
        const isEnded = timeLapsed <= 0;
        if (isEnded) {
          this.notify("Back to work!");
          this.setState({ status: statuses.ENDED, timeLapsed: 0 });
        }
        else {
          this.setState({ timeLapsed });
        }
      }
    }

    // update extension icon badge
    // if (timeLapsed%60 === 0) {
    //   window.chrome.runtime.sendMessage({ time: String(timeLapsed/60) }, () => {});
    // }
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
    let timeLapsed, restDuration;
    
    document.title = 'Pomodoro';

    // focus => rest
    // - elastic feature
    if (this.state.isFocusState) {
      timeLapsed = restDuration = Math.floor(this.state.timeLapsed * (this.props.restDuration/this.props.focusDuration));
    }
    // rest => focus
    // - resets rest duration
    else {
      timeLapsed = 0;
      restDuration = this.props.restDuration;
    }

    this.setState(prevState => {
      return {
        timeLapsed,
        startTime: +new Date(),
        status: statuses.RUNNING,
        isFocusState: !prevState.isFocusState,
        restDuration,
      };
    });
    this.startTimer();
  };

  render() {
    let timerClassName = this.state.isFocusState ? "timer timer-green" : "timer timer-red";
    return (
      <div className="main">
        <h1 className={timerClassName}>{this.parseTime(this.state.timeLapsed)}</h1>
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
  focusDuration: 25 * 60,
  restDuration: 5 * 60,
};

export default Main;
