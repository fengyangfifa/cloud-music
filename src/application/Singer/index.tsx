import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { TranslaterPoint } from "better-scroll";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/baseUI/header";
import Scroll from "@/baseUI/scroll";
import SongList from "@/application/SongList";
import Loading from "@/baseUI/loading";
import { ScrollHandle, MusicNoteHandle } from "@/types";
import { HEADER_HEIGHT } from "@/utils";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import { RootState } from "@/store";
import "./singer.scss";
import MusicNote from "@/baseUI/music-note";

// 往上偏移的尺寸，露出圆角
const OFFSET = 8;

function Singer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams<Record<"id", string>>();

  const collectButton = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const songScrollWrapper = useRef<HTMLDivElement>(null);
  const songScroll = useRef<ScrollHandle>(null);
  const header = useRef<HTMLDivElement>(null);
  const musicNoteRef = useRef<MusicNoteHandle>(null);

  // 图片初始高度
  const initialHeight = useRef(0);

  const [showStatus, setShowStatus] = useState(true);

  const {
    artist,
    songsOfArtist: songs,
    loading
  } = useSelector((state: RootState) => {
    return state.singer;
  });

  const setShowStatusFalse = () => {
    setShowStatus(false);
  };

  useEffect(() => {
    dispatch(getSingerInfo(params.id));

    return () => {
      dispatch(changeEnterLoading(true));
    };
  }, [dispatch, params.id]);

  useEffect(() => {
    if (
      !imageWrapper.current ||
      !songScrollWrapper.current ||
      !songScroll.current
    ) {
      return;
    }

    const h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    songScroll.current.refresh();
  }, []);

  const handleScroll = useCallback((pos: TranslaterPoint) => {
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    if (!imageDOM || !buttonDOM || !headerDOM) {
      return;
    }

    const height = initialHeight.current;
    const newY = pos.y;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    // 处理往下拉的情况，效果：图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translateY(${newY}px)`;
    } else if (newY >= minScrollY) {
      // 还原被下面修改后的样式
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = "0";
      imageDOM.style.zIndex = "50";

      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translateY(${newY}px)`;
      buttonDOM.style["opacity"] = `${Math.max(0, 1 - percent * 2)}`;
    } else if (newY < minScrollY) {
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      // 让图片的 z-index 高于滑动列表
      imageDOM.style.paddingTop = "0";
      imageDOM.style.zIndex = "99";
    }
  }, []);

  const musicAnimation = (x: number, y: number) => {
    musicNoteRef.current?.startAnimation({ x, y });
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
      <div className="singer">
        <Header
          title={artist.name}
          handleClick={setShowStatusFalse}
          ref={header}
        />
        <div
          className="img-wrapper"
          style={{ backgroundImage: `url(${artist.picUrl})` }}
          ref={imageWrapper}
        >
          <div className="filter" />
        </div>
        <div className="collect-button" ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </div>
        <div className="song-list-wrapper" ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongList
              songs={songs}
              showBackground={true}
              showCollect={false}
              musicAnimation={musicAnimation}
            />
          </Scroll>
        </div>
        {loading ? <Loading /> : null}
        <MusicNote ref={musicNoteRef} />
      </div>
    </CSSTransition>
  );
}

export default React.memo(Singer);
