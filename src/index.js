import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import "./style.css"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

/*
// Setup local storage for tasks data
window.onload = function() {
  let request = window.indexedDB.open('tasks_db', 1);

  request.onerror = function() {
    console.error('Database failed to open');
  }
  request.onsuccess = function() {
    console.log('Database opened successfully');
  }
  // setups the database tables if this has not already been done
  request.onupgradeneeded = function(e) {
      // grab a reference to the opened database
      let db = e.target.result;

      let objectStore = db.createObjectStore('tasks_db', { keyPath: 'id', autoIncrement: true });
      // define what data items objectStore will contain
      objectStore.createIndex('content', 'content');
      objectStore.createIndex('status', 'status');
      objectStore.createIndex('completionDate', 'completionDate');

      console.log('Database setup complete');
  }
}
*/