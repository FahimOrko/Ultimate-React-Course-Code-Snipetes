import React from "react";
import ReactDom from "react-dom/client";
import "./style.css";
import Card from "./Card";

const App = () => {
  return (
    <>
      <Card />
    </>
  );
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
