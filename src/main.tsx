import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppChaz from "./AppChaz";
import "./index.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const RootApp = path === "/chaz" ? AppChaz : App;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);
