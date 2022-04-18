import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { getRankList } from "./store";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import { RootState } from "@/store";
import { RankList, Tracks } from "@/types";
import { findIndex } from "@/api/utils";
import style from "./rank.module.scss";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

function Rank(props: RouteConfigComponentProps) {
  const dispatch = useDispatch();

  const { rankList, loading } = useSelector((state: RootState) => {
    return state.rank;
  });

  const globalIndex = findIndex(rankList);
  const officialList = rankList.slice(0, globalIndex);
  const globalList = rankList.slice(globalIndex);

  const enterDetail = (name: string) => {
    console.log(name);
  };

  useEffect(() => {
    dispatch(getRankList());
    // eslint-disable-next-line
  }, []);

  const renderSongList = (list: Tracks) => {
    return list.length ? (
      <ul className={style["song-list"]}>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first}-{item.second}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  const renderRankList = (list: RankList, globalRank = false) => {
    return (
      <ul className={clsx(style.list, globalRank && style["display-style"])}>
        {list.map((item) => {
          return (
            <li
              className={clsx(
                style["list-item"],
                item.tracks.length && style["list-item-style"]
              )}
              key={`${item.coverImgId} - ${item.name}`}
              onClick={() => enterDetail(item.name)}
            >
              <div
                className={clsx(
                  style["img-wrapper"],
                  item.tracks.length && style["img-style"]
                )}
              >
                <img src={item.coverImgUrl} alt="" />
                <div className={style.decorate} />
                <span className={style["update-frequency"]}>
                  {item.updateFrequency}
                </span>
              </div>
              {renderSongList(item.tracks)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={style.container}>
      <Scroll>
        <div className={style["rank-container"]}>
          <h1 className={clsx(style.official, loading && style.hidden)}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className={clsx(style.global, loading && style.hidden)}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <div className={style["enter-loading"]}>
              <Loading />
            </div>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route?.routes)}
    </div>
  );
}

export default React.memo(Rank);
