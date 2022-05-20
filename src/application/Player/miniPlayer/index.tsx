import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import ProgressCircle from "@/baseUI/progress-circle";
import { getName } from "@/utils";
import { TracksItem } from "@/types";
import "./mini-player.scss";

interface MiniPlayerProps {
  song: TracksItem;
  fullScreen: boolean;
  playing: boolean;
  percent: number;
  toggleFullScreen: (data: boolean) => void;
  clickPlaying: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    state: boolean
  ) => void;
  toggleShowPlayList: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: boolean
  ) => void;
}

function MiniPlayer(props: MiniPlayerProps) {
  const {
    song,
    fullScreen,
    playing,
    percent,
    toggleFullScreen,
    clickPlaying,
    toggleShowPlayList
  } = props;

  const miniPlayerRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      classNames="mini"
      in={!fullScreen}
      timeout={400}
      appear={true}
      onEnter={() => {
        if (miniPlayerRef.current) {
          miniPlayerRef.current.style.display = "flex";
        }
      }}
      onExited={() => {
        if (miniPlayerRef.current) {
          miniPlayerRef.current.style.display = "none";
        }
      }}
    >
      <div
        className="mini-player-container"
        ref={miniPlayerRef}
        onClick={() => {
          toggleFullScreen(true);
        }}
      >
        <div className="icon">
          <div className="img-wrapper">
            <img
              className={`play ${!playing ? "pause" : ""}`}
              src={song.al?.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar || [])}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            <i
              className={`icon-mini iconfont ${
                playing ? "icon-play" : "icon-pause"
              }`}
              onClick={(e) => clickPlaying(e, !playing)}
              dangerouslySetInnerHTML={{
                __html: playing ? "&#xe650;" : "&#xe61e;"
              }}
            />
          </ProgressCircle>
        </div>
        <div className="control" onClick={(e) => toggleShowPlayList(e, true)}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </div>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);
