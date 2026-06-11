import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppTom from "./AppTom";
import "./index.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const RootApp = path === "/tom" ? AppTom : App;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);
