import React from "react";
import ReactDOM from "react-dom";
import App from "modules/application/components/application";

require("./style.css");
require("react-toastify/dist/ReactToastify.min.css");

ReactDOM.render(<App />, document.getElementById("react-root"));
