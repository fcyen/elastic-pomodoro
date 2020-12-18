import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

let API = window.browser || window.chrome;
let extensionID = "godnllghdkigohcdiiljakabgemllifi";
let extensionPort;

// const ping = () => {
//   API.runtime.sendMessage(extensionID, 'ping', response => {
//     if (API.runtime.lastError) {
//       //console.log(API.runtime.lastError)
//       setTimeout(ping, 3000);
//     }
//     else {
//       console.log();
//       extensionPort = API.runtime.connect(extensionID);
//     }
//   })
// }

// ping();
