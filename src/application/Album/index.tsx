import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory, useParams } from "react-router-dom";
import { TranslaterPoint } from "better-scroll";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/baseUI/header";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import { getName, getCount } from "@/utils";
import {
  getAlbumList,
  changeEnterLoading,
  changeCurrentAlbum
} from "./store/actionCreators";
import { RootState } from "@/store";
import "./album.scss";

const HEADER_HEIGHT = 45;

function Album() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<Record<"id", string>>();

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否显示跑马灯

  const headerEl = useRef<HTMLDivElement>(null);

  const { currentAlbum, enterLoading } = useSelector(
    (state: RootState) => state.album
  );

  const handleBack = () => {
    setShowStatus(false);
  };

  const handleScroll = (pos: TranslaterPoint) => {
    const minScrollY = -HEADER_HEIGHT;
    const headerDom = headerEl.current;

    if (!headerDom) {
      return;
    }

    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      const percent = Math.abs(pos.y / minScrollY);
      headerDom.style.backgroundColor = "#d44439";
      // 让 dom 缓慢不透明
      headerDom.style.opacity = `${Math.min(1, (percent - 1) / 2)}`;
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = "1";
      setTitle("歌单");
      setIsMarquee(false);
    }
  };

  useEffect(() => {
    dispatch(getAlbumList(params.id));

    return () => {
      dispatch(
        changeCurrentAlbum({
          creator: {
            avatarUrl: "",
            nickname: ""
          },
          coverImgUrl: "",
          subscribedCount: 0,
          name: "",
          tracks: []
        })
      );
      dispatch(changeEnterLoading(true));
    };
  }, [dispatch, params.id]);

  const renderTopDesc = () => {
    return (
      <div className={"top-desc"}>
        <div
          className="background"
          style={{
            backgroundImage: `url(${currentAlbum.coverImgUrl})`
          }}
        >
          <div className="filter"></div>
        </div>
        <div className="img-wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play-count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className="desc-wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderMenu = () => {
    return (
      <div className="menu">
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </div>
    );
  };

  const renderSongList = () => {
    return (
      <div className="song-list">
        <div className="first-line">
          <div className="play-all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部{" "}
              <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
            </span>
          </div>
          <div className="add-list">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <ul className="song-item">
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit={true}
      onExited={history.goBack}
    >
      <div className="container">
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        />
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            {renderTopDesc()}
            {renderMenu()}
            {renderSongList()}
          </div>
        </Scroll>
        {enterLoading ? <Loading /> : null}
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);
