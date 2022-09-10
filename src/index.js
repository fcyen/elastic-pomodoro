import React from "react";
import ReactDOM from "react-dom";
import { store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from './store';
import App from "./components/App";
import "./style.css"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  rootElement
);
