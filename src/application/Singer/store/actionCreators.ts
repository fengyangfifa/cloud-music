import { Dispatch } from "redux";

import {
  CHANGE_ARTIST,
  CHANGE_ENTER_LOADING,
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ENTER_LOADING_TYPE,
  CHANGE_ARTIST_TYPE,
  CHANGE_SONGS_OF_ARTIST_TYPE
} from "./constants";
import { getSingerInfoRequest } from "@/api/request";
import { createAction } from "@/utils";
import { ArtistType, SongsType } from "@/types";

const changeArtist = (data: ArtistType) => {
  return createAction<CHANGE_ARTIST_TYPE, ArtistType>(CHANGE_ARTIST, data);
};

const changeSongs = (data: SongsType) => {
  return createAction<CHANGE_SONGS_OF_ARTIST_TYPE, SongsType>(
    CHANGE_SONGS_OF_ARTIST,
    data
  );
};

export const changeEnterLoading = (data: boolean) => {
  return createAction<CHANGE_ENTER_LOADING_TYPE, boolean>(
    CHANGE_ENTER_LOADING,
    data
  );
};

export const getSingerInfo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getSingerInfoRequest(id);
      dispatch(changeArtist(res.data.artist));
      dispatch(changeSongs(res.data.hotSongs));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.log("歌手数据获取失败");
    }
  };
};
