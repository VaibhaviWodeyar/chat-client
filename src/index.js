import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import "./global.css";
import { Provider } from "react-redux";

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
