import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { init_i18n } from "./i18n";
import reportWebVitals from "./reportWebVitals";

init_i18n();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
