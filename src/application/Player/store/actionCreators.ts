import {
  DELETE_SONG,
  DELETE_SONG_TYPE,
  SET_CURRENT_INDEX,
  SET_CURRENT_INDEX_TYPE,
  SET_CURRENT_SONG,
  SET_CURRENT_SONG_TYPE,
  SET_FULL_SCREEN,
  SET_FULL_SCREEN_TYPE,
  SET_PLAY_MODE,
  SET_PLAY_MODE_TYPE,
  SET_PLAYING_STATE,
  SET_PLAYING_STATE_TYPE,
  SET_PLAYLIST,
  SET_PLAYLIST_TYPE,
  SET_SEQUENCE_PLAYLIST,
  SET_SEQUENCE_PLAYLIST_TYPE,
  SET_SHOW_PLAYLIST,
  SET_SHOW_PLAYLIST_TYPE
} from "./constants";
import { createAction } from "@/utils";
import { PlayMode, TracksItem } from "@/types";

export const changeCurrentSong = (data: TracksItem) => {
  return createAction<SET_CURRENT_SONG_TYPE, TracksItem>(
    SET_CURRENT_SONG,
    data
  );
};

export const changeFullScreen = (data: boolean) => {
  return createAction<SET_FULL_SCREEN_TYPE, boolean>(SET_FULL_SCREEN, data);
};

export const changePlayingState = (data: boolean) => {
  return createAction<SET_PLAYING_STATE_TYPE, boolean>(SET_PLAYING_STATE, data);
};

export const changeSequencePlayList = (data: Array<TracksItem>) => {
  return createAction<SET_SEQUENCE_PLAYLIST_TYPE, Array<TracksItem>>(
    SET_SEQUENCE_PLAYLIST,
    data
  );
};

export const changePlayList = (data: Array<TracksItem>) => {
  return createAction<SET_PLAYLIST_TYPE, Array<TracksItem>>(SET_PLAYLIST, data);
};

export const changePlayMode = (data: PlayMode) => {
  return createAction<SET_PLAY_MODE_TYPE, PlayMode>(SET_PLAY_MODE, data);
};

export const changeCurrentIndex = (data: number) => {
  return createAction<SET_CURRENT_INDEX_TYPE, number>(SET_CURRENT_INDEX, data);
};

export const changeShowPlayList = (data: boolean) => {
  return createAction<SET_SHOW_PLAYLIST_TYPE, boolean>(SET_SHOW_PLAYLIST, data);
};

export const deleteSong = (data: TracksItem) => {
  return createAction<DELETE_SONG_TYPE, TracksItem>(DELETE_SONG, data);
};
