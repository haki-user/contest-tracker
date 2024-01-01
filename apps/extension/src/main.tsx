import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

const ele = document.getElementById("root");
if (!ele) {
  throw new Error("Could not find root element");
}
createRoot(ele).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
