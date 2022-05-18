import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

import Horizon from "@/baseUI/horizon-item";
import { categoryTypes, alphaTypes, MINI_PLAYER_HEIGHT } from "@/utils";
import Scroll from "@/baseUI/scroll";
import {
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
  changePullUpLoading,
  changeEnterLoading,
  changePullDownLoading,
  changePageCount
} from "./store/actionCreators";
import { RootState } from "@/store";
import singer from "./singer.png";
import style from "./singers.module.scss";
import Loading from "@/baseUI/loading";

function Singers(props: RouteConfigComponentProps) {
  let [category, setCategory] = useState("");
  let [alpha, setAlpha] = useState("");
  const {
    singerList,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    enterLoading
  } = useSelector((state: RootState) => {
    return state.singers;
  });
  const songsCount = useSelector((state: RootState) => {
    return state.player.playList.length;
  });
  const dispatch = useDispatch();

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, val));
  };

  const handleUpdateCategory = (val: string) => {
    setCategory(val);
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(val, alpha));
  };

  // 上拉加载更多
  const handlePullUp = () => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (category === "" && alpha === "") {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  };

  // 下拉刷新
  const handlePullDown = () => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (category === "" && alpha === "") {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  };

  const enterDetail = (id: number) => {
    props.history.push(`/singers/${id}`);
  };

  useEffect(() => {
    dispatch(getHotSingerList());
  }, [dispatch]);

  const renderSingerList = () => {
    return (
      <div className={style.list}>
        {singerList.map((item, index) => {
          return (
            <div
              className={style["list-item"]}
              key={`${item.picId + index}`}
              onClick={() => enterDetail(item.id)}
            >
              <div className={style["img-wrapper"]}>
                <LazyLoad
                  placeholder={
                    <img src={singer} width="100%" height="100%" alt="music" />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className={style.name}>{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        className={style["nav-container"]}
        style={{ bottom: songsCount > 0 ? MINI_PLAYER_HEIGHT : 0 }}
      >
        <Horizon
          list={categoryTypes}
          title="分类 (默认热门):"
          oldVal={category}
          handleClick={handleUpdateCategory}
        />
        <Horizon
          list={alphaTypes}
          title="首字母:"
          oldVal={alpha}
          handleClick={handleUpdateAlpha}
        />
      </div>
      <div className={style["list-container"]}>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullDownLoading={pullDownLoading}
          pullUpLoading={pullUpLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading} />
      </div>
      {renderRoutes(props.route?.routes)}
    </>
  );
}

export default React.memo(Singers);
