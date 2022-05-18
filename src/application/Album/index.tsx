import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory, useParams } from "react-router-dom";
import { TranslaterPoint } from "better-scroll";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/baseUI/header";
import Scroll from "@/baseUI/scroll";
import Loading from "@/baseUI/loading";
import SongList from "@/application/SongList";
import MusicNote from "@/baseUI/music-note";
import {
  getAlbumList,
  changeEnterLoading,
  changeCurrentAlbum
} from "./store/actionCreators";
import { HEADER_HEIGHT } from "@/utils";
import { RootState } from "@/store";
import { MusicNoteHandle } from "@/types";
import "./album.scss";

function Album() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<Record<"id", string>>();

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否显示跑马灯

  const headerEl = useRef<HTMLDivElement>(null);
  const musicNoteRef = useRef<MusicNoteHandle>(null);

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

  const musicAnimation = (x: number, y: number) => {
    musicNoteRef.current?.startAnimation({ x, y });
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
            <SongList
              collectCount={currentAlbum.tracks.length}
              showCollect={true}
              songs={currentAlbum.tracks}
              showBackground={true}
              musicAnimation={musicAnimation}
            />
          </div>
        </Scroll>
        {enterLoading ? <Loading /> : null}
        <MusicNote ref={musicNoteRef} />
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);
