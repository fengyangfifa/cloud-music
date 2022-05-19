import React, { useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";

import { formatPlayTime, getName, throttle } from "@/utils";
import { PlayMode, ProgressBarHandle, TracksItem } from "@/types";
import ProgressBar from "@/baseUI/progress-bar";
import "./normal-player.scss";

interface NormalPlayerProps {
  song: TracksItem;
  fullScreen: boolean;
  playing: boolean;
  percent: number;
  duration: number;
  currentTime: number;
  currentIndex: number;
  mode: PlayMode;
  toggleFullScreen: (data: boolean) => void;
  clickPlaying: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    state: boolean
  ) => void;
  onProgressChange: (percent: number) => void;
  handlePrev: (index: number) => void;
  handleNext: (index: number) => void;
  changeMode: () => void;
}

function NormalPlayer(props: NormalPlayerProps) {
  const normalPlayerRef = useRef<HTMLDivElement>(null);
  const cdWrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ProgressBarHandle>(null);

  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    // 点击小圆的宽度
    const targetWidth = 40;
    // 小圆的圆心距离左边的距离
    const paddingLeft = 40;
    // 小圆的圆心下边的距离
    const paddingBottom = 30;
    // 大圆绝对定位的 top
    const paddingTop = 80;
    // 大圆外边距父级上边的距离
    const offsetY = 43;

    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;

    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y =
      window.innerHeight - paddingTop - width / 2 - paddingBottom - offsetY;
    return {
      x,
      y,
      scale
    };
  };

  const enter = () => {
    const normalPlayerDom = normalPlayerRef.current;
    const cdWrapperDom = cdWrapperRef.current;
    if (!normalPlayerDom || !cdWrapperDom) {
      return;
    }

    normalPlayerDom.style.display = "block";

    // 校准进度条
    // 因为当 normalPlayer 的 display 为 none 时。浏览器不渲染，导致计算进度条时出错。
    // 需要在 display 为 block 时，重新计算一次
    progressRef.current?.adjustment();

    // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    const { x, y, scale } = _getPosAndScale();
    const animation = {
      0: {
        // 使大圆和小圆一样大，动画开始时大圆和小圆重合
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: "translate3d(0, 0, 0) scale(1.1)"
      },
      100: {
        transform: "translate3d(0, 0, 0) scale(1)"
      }
    };

    animations.registerAnimation({
      name: "enterAnimation",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });

    animations.runAnimation(cdWrapperDom, "enterAnimation");
  };

  const afterEnter = () => {
    //  进入后解绑帧动画
    animations.unregisterAnimation("enterAnimation");
  };

  const leave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (!cdWrapperDom) {
      return;
    }

    const { x, y, scale } = _getPosAndScale();
    const animation = {
      100: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      }
    };

    animations.registerAnimation({
      name: "leaveAnimation",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });

    animations.runAnimation(cdWrapperDom, "leaveAnimation");
  };

  const afterLeave = () => {
    const normalPlayerDom = normalPlayerRef.current;
    if (!normalPlayerDom) {
      return;
    }

    animations.unregisterAnimation("leaveAnimation");
    normalPlayerDom.style.display = "none";
  };

  const {
    song,
    fullScreen,
    playing,
    duration,
    currentTime,
    percent,
    mode,
    currentIndex,
    clickPlaying,
    toggleFullScreen,
    onProgressChange,
    handlePrev,
    handleNext,
    changeMode
  } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onHandlePrev = useCallback(throttle(handlePrev, 200), [handlePrev]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onHandleNext = useCallback(throttle(handleNext, 200), [handleNext]);

  const getPlayMode = () => {
    let content: string;

    if (mode === PlayMode.sequence) {
      content = "&#xe625;";
    } else if (mode === PlayMode.loop) {
      content = "&#xe653;";
    } else {
      content = "&#xe61b;";
    }

    return content;
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      appear={true}
      mountOnEnter={true}
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <div className="normal-player-container" ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al?.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer" />
        <div className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar || [])}</h1>
        </div>
        <div className="middle" ref={cdWrapperRef}>
          <div className="cd-wrapper">
            <div className="cd">
              <img
                className={`image play ${!playing ? "pause" : ""}`}
                src={song.al?.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="progress-wrapper">
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
                ref={progressRef}
              />
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </div>
          <div className="operators">
            <div className="icon i-left" onClick={changeMode}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{ __html: getPlayMode() }}
              />
            </div>
            <div
              className="icon i-left"
              onClick={() => onHandlePrev(currentIndex)}
            >
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;"
                }}
              />
            </div>
            <div
              className="icon i-right"
              onClick={() => onHandleNext(currentIndex)}
            >
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);
