import React from "react";
import ReactDOM from "react-dom";
import App from "components/app";
import { initSW } from "./service-workers";

require("./style.css");
require("react-toastify/dist/ReactToastify.min.css");

initSW();
ReactDOM.render(<App />, document.getElementById("react-root"));
