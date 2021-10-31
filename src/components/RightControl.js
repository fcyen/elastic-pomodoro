import React, { Component } from "react";
import { faCheck, faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { statuses } from "./Main";

class RightControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let button;
    let className = "main-control";

    switch (this.props.status) {
      case statuses.PAUSED:
        button = (
          <FontAwesomeIcon icon={faUndoAlt} onClick={this.props.onReset} className={className}/>
        );
        break;
      case statuses.RUNNING:
        button = <FontAwesomeIcon icon={faCheck} onClick={this.props.onDone} className={className}/>;
        break;
      case statuses.ENDED:
        button = <FontAwesomeIcon icon={faCheck} onClick={this.props.onDone} className={className}/>;
        break;
      default:
        button = <p>default</p>;
        break;
    }

    return <div className="main-control main-control-right">{button}</div>;
  }
}

export default RightControl;
