import { Dispatch } from "redux";

import {
  CHANGE_CURRENT_ALBUM,
  CHANGE_CURRENT_ALBUM_TYPE,
  CHANGE_ENTER_LOADING,
  CHANGE_ENTER_LOADING_TYPE
} from "./constants";
import { createAction } from "@/utils";
import { AlbumType } from "@/types";
import { getAlbumDetailRequest } from "@/api/request";

export const changeCurrentAlbum = (data: AlbumType) => {
  return createAction<CHANGE_CURRENT_ALBUM_TYPE, AlbumType>(
    CHANGE_CURRENT_ALBUM,
    data
  );
};

export const changeEnterLoading = (data: boolean) => {
  return createAction<CHANGE_ENTER_LOADING_TYPE, boolean>(
    CHANGE_ENTER_LOADING,
    data
  );
};

export const getAlbumList = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getAlbumDetailRequest(id);
      const data = res.data.playlist;
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
    } catch (e) {
      console.log("获取 album 数据失败！");
    }
  };
};
