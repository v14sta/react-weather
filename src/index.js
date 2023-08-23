import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./Footer.js";
import App from "./App.js";
import "./styles.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>
);
reportWebVitals();
