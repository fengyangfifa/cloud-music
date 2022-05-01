import produce from "immer";
import { Reducer } from "redux";

import {
  CHANGE_ENTER_LOADING,
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ARTIST
} from "./constants";
import { ArtistType, SongsType } from "@/types";

export interface SingerState {
  readonly artist: ArtistType;
  readonly songsOfArtist: SongsType;
  readonly loading: boolean;
}

const defaultState: SingerState = {
  artist: { name: "", picUrl: "" },
  songsOfArtist: [],
  loading: true
};

const singerReducer: Reducer<SingerState> = produce((state, action) => {
  if (!state) {
    return;
  }

  switch (action.type) {
    case CHANGE_ARTIST:
      state.artist = action.data;
      break;
    case CHANGE_SONGS_OF_ARTIST:
      state.songsOfArtist = action.data;
      break;
    case CHANGE_ENTER_LOADING:
      state.loading = action.data;
      break;
  }
}, defaultState);

export default singerReducer;
