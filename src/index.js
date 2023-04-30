import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/common.css";
import EntryApp from "./screens/EntryApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <EntryApp />
  //</React.StrictMode>
);
