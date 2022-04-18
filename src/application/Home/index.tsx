import React from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NavLink } from "react-router-dom";

import style from "./home.module.scss";

function Home(props: RouteConfigComponentProps) {
  const { route } = props;

  return (
    <div className="Home">
      <div className={style.top}>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </div>
      <div className={style.tab}>
        <NavLink to="/recommend" activeClassName={style.selected}>
          <div className={style["tab-item"]}>
            <span> 推荐 </span>
          </div>
        </NavLink>
        <NavLink to="/singers" activeClassName={style.selected}>
          <div className={style["tab-item"]}>
            <span> 歌手 </span>
          </div>
        </NavLink>
        <NavLink to="/rank" activeClassName={style.selected}>
          <div className={style["tab-item"]}>
            <span> 排行榜 </span>
          </div>
        </NavLink>
      </div>
      {renderRoutes(route?.routes)}
    </div>
  );
}

export default React.memo(Home);
