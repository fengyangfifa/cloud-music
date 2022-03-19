import React from "react";
import {renderRoutes} from "react-router-config";
import style from "./home.module.scss"

function Home(props) {
  const {route} = props;

  return (
    <div className={style.top}>
      <span className="iconfont menu">&#xe65c;</span>
      <span className="title">WebApp</span>
      <span className="iconfont search">&#xe62b;</span>
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);
