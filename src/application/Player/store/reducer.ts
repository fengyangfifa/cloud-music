import produce from "immer";

import {
  SET_CURRENT_INDEX,
  SET_CURRENT_SONG,
  SET_SHOW_PLAYLIST,
  SET_PLAY_MODE,
  SET_PLAYLIST,
  SET_SEQUENCE_PLAYLIST,
  SET_PLAYING_STATE,
  SET_FULL_SCREEN,
  DELETE_SONG
} from "./constants";
import { PlayMode, TracksItem } from "@/types";
import { findIndex } from "@/utils";

export interface PlayerState {
  fullScreen: boolean;
  playing: boolean;
  sequencePlayList: Array<TracksItem>; //顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: Array<TracksItem>;
  mode: PlayMode;
  currentIndex: number;
  showPlayList: boolean;
  currentSong: TracksItem;
}

const defaultState: PlayerState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: PlayMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: { id: 0, name: "", dt: 0 }
};

const handleDeleteSong = (state: PlayerState, song: TracksItem) => {
  let { playList, sequencePlayList, currentIndex } = state;
  const pIndex = findIndex(song, playList);
  playList.splice(pIndex, 1);

  // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
  if (pIndex < currentIndex) {
    state.currentIndex -= 1;
  }

  const sIndex = findIndex(song, sequencePlayList);
  sequencePlayList.splice(sIndex, 1);
};

const playerReducer = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case SET_CURRENT_SONG:
      state.currentSong = action.data;
      break;
    case SET_FULL_SCREEN:
      state.fullScreen = action.data;
      break;
    case SET_PLAYING_STATE:
      state.playing = action.data;
      break;
    case SET_SEQUENCE_PLAYLIST:
      state.sequencePlayList = action.data;
      break;
    case SET_PLAYLIST:
      state.playList = action.data;
      break;
    case SET_PLAY_MODE:
      state.mode = action.data;
      break;
    case SET_CURRENT_INDEX:
      state.currentIndex = action.data;
      break;
    case SET_SHOW_PLAYLIST:
      state.showPlayList = action.data;
      break;
    case DELETE_SONG:
      handleDeleteSong(state, action.data);
      break;
  }
}, defaultState);

export default playerReducer;
