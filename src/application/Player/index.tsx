import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import PlayList from "./play-list";
import Toast from "@/baseUI/toast";
import { RootState } from "@/store";
import { findIndex, getSongUrl, shuffle } from "@/utils";
import {
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changePlayingState,
  changePlayList,
  changePlayMode,
  changeShowPlayList
} from "./store/actionCreators";
import { PlayMode, ToastHandle, TracksItem } from "@/types";
import { getLyricRequest } from "@/api/request";
import LyricParser from "@/utils/lyric-parser";

enum AudioState {
  NO_START = 0,
  STARTED = 1
}

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
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  const [currentLineNum, setCurrentLineNum] = useState(0);
  const toastRef = useRef<ToastHandle>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentLyric = useRef<LyricParser | null>(null);
  const audioStateRef = useRef(AudioState.NO_START);
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

  const toggleShowPlayListDispatch = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, data: boolean) => {
      dispatch(changeShowPlayList(data));
      e.stopPropagation();
    },
    [dispatch]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLyric = (id: number) => {
    let lyric: string;
    currentLyric.current?.stop();
    currentLyric.current = null;

    getLyricRequest(id).then((res) => {
      lyric = res.data.lrc.lyric;
      if (!lyric) {
        currentLyric.current = null;
        return;
      }

      currentLyric.current = new LyricParser(lyric, handleLyric);
      if (audioStateRef.current === AudioState.STARTED) {
        currentLyric.current?.seek(currentTime * 1000);
      }
    });
  };

  const handleLyric = ({ lineNum, txt }: { lineNum: number; txt: string }) => {
    setCurrentLineNum(lineNum);
    setPlayingLyric(txt);
  };

  useEffect(() => {
    if (!playList.length || currentIndex === -1 || !playList[currentIndex]) {
      return;
    }

    const current = playList[currentIndex];
    changeCurrentDispatch(current);
  }, [changeCurrentDispatch, currentIndex, playList]);

  const playAudio = useCallback(
    (offset = 0) => {
      audioRef.current
        ?.play()
        .then(() => {
          if (audioStateRef.current === AudioState.NO_START) {
            audioStateRef.current = AudioState.STARTED;
            currentLyric.current?.play();
          } else {
            currentLyric.current?.play(offset, true);
          }
        })
        .catch(() => {
          console.log("？？？？");
          togglePlayingDispatch(false);
        });
    },
    [togglePlayingDispatch]
  );

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    currentLyric.current?.stop();
  }, []);

  useEffect(() => {
    if (!currentSong || currentSong.id === preSong.id || !audioRef.current) {
      return;
    }

    audioStateRef.current = AudioState.NO_START;
    getLyric(currentSong.id);
    setPreSong(currentSong);
    audioRef.current.src = getSongUrl(currentSong.id);
    if (playing) {
      playAudio();
    }

    setDuration(currentSong.dt / 1000);
  }, [currentSong, getLyric, playAudio, playing, preSong.id]);

  useEffect(() => {
    if (playing) {
      if (!audioRef.current?.paused) {
        return;
      }

      playAudio(currentTime * 1000);
    } else {
      if (audioStateRef.current !== AudioState.NO_START) {
        pauseAudio();
      }
    }
  }, [currentTime, pauseAudio, playAudio, playing, togglePlayingDispatch]);

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

    if (currentLyric.current) {
      currentLyric.current?.seek(nowTime * 1000);
    }
  };

  const handleLoop = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play().catch(() => {
      togglePlayingDispatch(false);
    });
  }, [togglePlayingDispatch]);

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

  const handlePrev = useCallback(
    (currentIndex) => {
      // 播放列表只有一首歌时单曲循环
      if (playList.length === 1 || mode === PlayMode.loop) {
        handleLoop();
        return;
      }

      let index = currentIndex - 1;
      if (index < 0) {
        index = playList.length - 1;
      }

      setCurrentTime(0);
      setCurrentLineNum(0);
      setPlayingLyric("");

      if (!playing) {
        togglePlayingDispatch(true);
      }

      changeCurrentIndexDispatch(index);
    },
    [
      changeCurrentIndexDispatch,
      handleLoop,
      mode,
      playList.length,
      playing,
      togglePlayingDispatch
    ]
  );

  const handleNext = useCallback(
    (currentIndex: number) => {
      // 播放列表只有一首歌时单曲循环
      if (playList.length === 1 || mode === PlayMode.loop) {
        handleLoop();
        return;
      }

      let index = currentIndex + 1;
      if (index === playList.length) {
        index = 0;
      }

      setCurrentTime(0);
      setCurrentLineNum(0);
      setPlayingLyric("");

      if (!playing) {
        togglePlayingDispatch(true);
      }

      changeCurrentIndexDispatch(index);
    },
    [
      changeCurrentIndexDispatch,
      handleLoop,
      mode,
      playList.length,
      playing,
      togglePlayingDispatch
    ]
  );

  const handleEnd = (index: number) => {
    if (mode === PlayMode.loop) {
      handleLoop();
    } else {
      handleNext(index);
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
          toggleShowPlayList={toggleShowPlayListDispatch}
        />
      ) : null}
      {sequencePlayList.length > 0 ? (
        <NormalPlayer
          mode={mode}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          currentTime={currentTime}
          currentIndex={currentIndex}
          duration={duration}
          percent={percent}
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          currentLineNum={currentLineNum}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          changeMode={changeMode}
          toggleShowPlayList={toggleShowPlayListDispatch}
        />
      ) : null}
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={() => handleEnd(currentIndex)}
      />
      <PlayList />
      <Toast text={modeText} ref={toastRef} />
    </div>
  );
}

export default React.memo(Player);
