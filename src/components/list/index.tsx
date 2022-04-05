import React from "react";
import clsx from "clsx";
import LazyLoad from "react-lazyload";

import style from "./list.module.scss";
import { getCount } from "@/api/utils";
import { RecommendList as RecommendListProps } from "@/types";
import music from "./music.png";

interface ListProps {
  recommendList: RecommendListProps;
}

function RecommendList(props: ListProps) {
  return (
    <div className={style["list-wrapper"]}>
      <h1 className={style.title}> 推荐歌单 </h1>
      <div className={style.list}>
        {props.recommendList.map((item, index) => {
          return (
            <div className={style["list-item"]} key={item.id + index}>
              <div className={style["img-wrapper"]}>
                <LazyLoad
                  placeholder={
                    <img src={music} width="100%" height="100%" alt="music" />
                  }
                >
                  <img src={item.picUrl + "?param=300x300"} alt="music" />
                </LazyLoad>
                <div className={style["play-count"]}>
                  <i className={clsx("iconfont", style.play)}>&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className={style.desc}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(RecommendList);
