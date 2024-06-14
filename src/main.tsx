import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// In your main file, e.g., index.js or main.ts
import "./playtime/messaround.js";
import "./playtime/messaround2.js";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
