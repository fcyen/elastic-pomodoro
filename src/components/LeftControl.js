import React, { Component } from "react";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { statuses } from "./Main";

class LeftControl extends Component {
  render() {
    let button;

    switch (this.props.status) {
      case statuses.PAUSED:

        button = (
          <FontAwesomeIcon icon={faPlay} onClick={this.props.onResume} />
        );
        break;
      case statuses.RUNNING:
        button = (
          <FontAwesomeIcon icon={faPause} onClick={this.props.onPause} />
        );
        break;
      case statuses.ENDED:
        button = <FontAwesomeIcon icon={faPause} className="disabled" color="green" />;
        break;
      default:
        button = <p>default</p>;
        break;
    }

    return <div className="main-control main-control-left">{button}</div>;
  }
}

export default LeftControl;
