import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TextEditor from "./textEditor";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.defaults.baseURL = "https://blogs-mern-app.herokuapp.com";
axios.defaults.withCredentials = true;
axios.defaults.params = {
  mediaURL: "https://blogs-mern-app.herokuapp.com",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
