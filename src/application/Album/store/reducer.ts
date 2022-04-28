import produce from "immer";
import { Reducer } from "redux";

import { AlbumType } from "@/types";
import { CHANGE_ENTER_LOADING, CHANGE_CURRENT_ALBUM } from "./constants";

export interface AlbumState {
  readonly currentAlbum: AlbumType;
  readonly enterLoading: boolean;
}

const defaultState: AlbumState = {
  currentAlbum: {
    creator: {
      avatarUrl: "",
      nickname: ""
    },
    coverImgUrl: "",
    subscribedCount: 0,
    name: "",
    tracks: []
  },
  enterLoading: true
};

const albumReducer: Reducer<AlbumState> = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case CHANGE_CURRENT_ALBUM:
      state.currentAlbum = action.data;
      break;
    case CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
  }
}, defaultState);

export default albumReducer;
