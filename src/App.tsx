import React from 'react';
import {renderRoutes} from "react-router-config";
import {HashRouter} from "react-router-dom";

import './style.css';
import './assets/iconfont/iconfont.css';

import routes from "./routes";

function App() {
  return (
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  );
}

export default App;
