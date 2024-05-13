import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GlobalStatesProvider } from "./shared/context/GlobalStates";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStatesProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </GlobalStatesProvider>
);
