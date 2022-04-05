import React from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./style.css";
import "./assets/iconfont/iconfont.css";
import routes from "./routes";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes)}</HashRouter>
    </Provider>
  );
}

export default App;
