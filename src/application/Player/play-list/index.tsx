import React, { useCallback, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import { findIndex, getName, shuffle } from "@/utils";
import { PlayMode, TracksItem, ConfirmHandle } from "@/types";
import Scroll from "@/baseUI/scroll";
import Confirm from "@/baseUI/confirm";
import {
  changeShowPlayList,
  changeCurrentIndex,
  deleteSong,
  changePlayList,
  changeSequencePlayList,
  changePlayingState,
  changePlayMode,
  changeFullScreen
} from "../store/actionCreators";
import { RootState } from "@/store";
import "./play-list.scss";

function PlayList() {
  const dispatch = useDispatch();
  const {
    showPlayList,
    playList,
    currentSong,
    mode,
    sequencePlayList,
    playing,
    fullScreen
  } = useSelector((state: RootState) => state.player);
  const playListRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const confirmRef = useRef<ConfirmHandle>(null);

  const toggleShowPlayListDispatch = (state: boolean) => {
    dispatch(changeShowPlayList(state));
  };

  const changeCurrentIndexDispatch = (index: number) => {
    dispatch(changeCurrentIndex(index));
  };

  const deleteSongDispatch = (song: TracksItem) => {
    dispatch(deleteSong(song));
  };

  const changePlayListDispatch = (data: Array<TracksItem>) => {
    dispatch(changePlayList(data));
  };

  const changeModeDispatch = (mode: PlayMode) => {
    dispatch(changePlayMode(mode));
  };

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);

    const listWrapperDom = listWrapperRef.current;
    if (listWrapperDom) {
      // 最开始是隐藏在下面
      listWrapperDom.style.transform = "translate3d(0, 100%, 0)";
    }
  }, []);

  const onEnteringCB = useCallback(() => {
    // 让列表展现
    const listWrapperDom = listWrapperRef.current;
    if (listWrapperDom) {
      listWrapperDom.style.transition = "all 0.3s";
      listWrapperDom.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  const onExitingCB = useCallback(() => {
    const listWrapperDom = listWrapperRef.current;
    if (listWrapperDom) {
      listWrapperDom.style["transition"] = "all 0.3s";
      listWrapperDom.style.transform = "translate3d(0, 100%, 0)";
    }
  }, []);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
  }, []);

  const handleShowClear = () => {
    confirmRef.current?.show();
  };

  const handleDeleteSong = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: TracksItem
  ) => {
    e.stopPropagation();
    deleteSongDispatch(item);
  };

  const handleConfirmClear = () => {
    // 1. 清空两个列表
    changePlayListDispatch([]);
    dispatch(changeSequencePlayList([]));

    // 2. 关闭 PlayList 的显示
    toggleShowPlayListDispatch(false);

    // 3. 重置播放状态
    if (playing) {
      dispatch(changePlayingState(false));
    }

    // 4. 退出全屏
    if (fullScreen) {
      dispatch(changeFullScreen(false));
    }
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;

    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
    } else {
      // 随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }

    changeModeDispatch(newMode);
  };

  const getCurrentIcon = (item: TracksItem) => {
    const isCurrent = currentSong.id === item.id;
    const className = isCurrent ? "icon-play" : "";
    const content = isCurrent ? "&#xe6e3;" : "";

    return (
      <i
        className={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const getPlayMode = () => {
    let content: string, text: string;
    if (mode === PlayMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === PlayMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }

    return (
      <div>
        <i
          className="iconfont"
          onClick={changeMode}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <span className="text" onClick={changeMode}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <div
        className="play-list-wrapper"
        ref={playListRef}
        style={{ display: isShow ? "block" : "none" }}
        onClick={() => toggleShowPlayListDispatch(false)}
      >
        <div
          className="list-wrapper"
          ref={listWrapperRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="list-header">
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={handleShowClear}>
                &#xe63d;
              </span>
            </h1>
          </div>
          <div className="scroll-wrapper">
            <Scroll>
              <ul className="list-content">
                {playList.map((item, index) => {
                  return (
                    <li
                      className="item"
                      key={item.id}
                      onClick={() => changeCurrentIndexDispatch(index)}
                    >
                      {getCurrentIcon(item)}
                      <span className="text">
                        {item.name} - {getName(item.ar || [])}
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span
                        className="delete"
                        onClick={(e) => {
                          handleDeleteSong(e, item);
                        }}
                      >
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Scroll>
          </div>
          <Confirm
            ref={confirmRef}
            text="是否删除全部？"
            cancelBtnText="取消"
            confirmBtnText="确定"
            handleConfirm={handleConfirmClear}
          />
        </div>
      </div>
    </CSSTransition>
  );
}

export default React.memo(PlayList);
