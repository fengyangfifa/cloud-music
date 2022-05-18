import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import Toast from "@/baseUI/toast";
import { RootState } from "@/store";
import { findIndex, getSongUrl, shuffle } from "@/utils";
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayingState,
  changePlayList,
  changePlayMode
} from "./store/actionCreators";
import { PlayMode, ToastHandle, TracksItem } from "@/types";

function Player() {
  const dispatch = useDispatch();

  const {
    fullScreen,
    playing,
    currentIndex,
    playList,
    currentSong,
    mode,
    sequencePlayList
  } = useSelector((state: RootState) => state.player);

  // 目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  // 歌曲播放进度
  const [preSong, setPreSong] = useState({ id: 0 });
  const [modeText, setModeText] = useState("");
  const toastRef = useRef<ToastHandle>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const changeCurrentDispatch = useCallback(
    (data: TracksItem) => {
      dispatch(changeCurrentSong(data));
    },
    [dispatch]
  );

  const changeCurrentIndexDispatch = useCallback(
    (data: number) => {
      dispatch(changeCurrentIndex(data));
    },
    [dispatch]
  );

  const toggleFullScreenDispatch = (state: boolean) => {
    dispatch(changeFullScreen(state));
  };

  const togglePlayingDispatch = useCallback(
    (state: boolean) => {
      dispatch(changePlayingState(state));
    },
    [dispatch]
  );

  const changeModeDispatch = useCallback(
    (mode: PlayMode) => {
      dispatch(changePlayMode(mode));
    },
    [dispatch]
  );

  const changePlayListDispatch = useCallback(
    (data: Array<TracksItem>) => {
      dispatch(changePlayList(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!playList.length || currentIndex === -1 || !playList[currentIndex]) {
      return;
    }

    const current = playList[currentIndex];
    changeCurrentDispatch(current);
  }, [changeCurrentDispatch, currentIndex, playList]);

  useEffect(() => {
    if (!currentSong || currentSong.id === preSong.id || !audioRef.current) {
      return;
    }

    setPreSong(currentSong);
    audioRef.current.src = getSongUrl(currentSong.id);
    if (playing) {
      audioRef.current.play().catch(() => {
        togglePlayingDispatch(false);
      });
    }

    setCurrentTime(0);
    setDuration(currentSong.dt / 1000);
  }, [currentSong, playing, preSong.id, togglePlayingDispatch]);

  useEffect(() => {
    if (playing) {
      audioRef.current?.play().catch(() => {
        togglePlayingDispatch(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [playing, togglePlayingDispatch]);

  const clickPlaying = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    state: boolean
  ) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const updateTime = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setCurrentTime((e.target as HTMLAudioElement).currentTime);
  };

  const onProgressChange = (curPercent: number) => {
    if (!audioRef.current) {
      return;
    }

    const nowTime = curPercent * duration;
    setCurrentTime(nowTime);
    audioRef.current.currentTime = nowTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  const handleLoop = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play().catch(() => {
      togglePlayingDispatch(false);
    });
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;

    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else {
      // 随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }

    changeModeDispatch(newMode);
    toastRef.current?.show();
  };

  const handlePrev = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1 || mode === PlayMode.loop) {
      handleLoop();
      return;
    }

    let index = currentIndex - 1;
    if (index < 0) {
      index = playList.length - 1;
    }

    if (!playing) {
      togglePlayingDispatch(true);
    }

    changeCurrentIndexDispatch(index);
  };

  const handleNext = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1 || mode === PlayMode.loop) {
      handleLoop();
      return;
    }

    let index = currentIndex + 1;
    if (index === playList.length) {
      index = 0;
    }

    if (!playing) {
      togglePlayingDispatch(true);
    }

    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (mode === PlayMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };

  return (
    <div>
      {sequencePlayList.length > 0 ? (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
        />
      ) : null}
      {sequencePlayList.length > 0 ? (
        <NormalPlayer
          mode={mode}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          currentTime={currentTime}
          duration={duration}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          changeMode={changeMode}
        />
      ) : null}
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} />
      <Toast text={modeText} ref={toastRef} />
    </div>
  );
}

export default React.memo(Player);
