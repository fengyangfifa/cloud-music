import { Dispatch } from "redux";
import { RootState } from "@/store";

import {
  CHANGE_ENTER_LOADING,
  CHANGE_ENTER_LOADING_TYPE,
  CHANGE_PAGE_COUNT,
  CHANGE_PAGE_COUNT_TYPE,
  CHANGE_PULL_DOWN_LOADING,
  CHANGE_PULL_DOWN_LOADING_TYPE,
  CHANGE_PULL_UP_LOADING,
  CHANGE_PULL_UP_LOADING_TYPE,
  CHANGE_SINGER_LIST,
  CHANGE_SINGER_LIST_TYPE
} from "./constants";

import { SingerList } from "@/types";
import { createAction } from "@/utils";

import { getHotSingerListRequest, getSingerListRequest } from "@/api/request";

export const changeSingerList = (data: SingerList) => {
  return createAction<CHANGE_SINGER_LIST_TYPE, SingerList>(
    CHANGE_SINGER_LIST,
    data
  );
};

export const changePageCount = (data: number) => {
  return createAction<CHANGE_PAGE_COUNT_TYPE, number>(CHANGE_PAGE_COUNT, data);
};

export const changeEnterLoading = (data: boolean) => {
  return createAction<CHANGE_ENTER_LOADING_TYPE, boolean>(
    CHANGE_ENTER_LOADING,
    data
  );
};

export const changePullUpLoading = (data: boolean) => {
  return createAction<CHANGE_PULL_UP_LOADING_TYPE, boolean>(
    CHANGE_PULL_UP_LOADING,
    data
  );
};

export const changePullDownLoading = (data: boolean) => {
  return createAction<CHANGE_PULL_DOWN_LOADING_TYPE, boolean>(
    CHANGE_PULL_DOWN_LOADING,
    data
  );
};

export const getHotSingerList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getHotSingerListRequest(0);
      const data = res.data.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    } catch (e) {
      console.log("热门歌手数据获取失败");
    }
  };
};

export const refreshMoreHotSingerList = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      console.log("start");
      const { singerList, pageCount } = getState().singers;
      const res = await getHotSingerListRequest(pageCount);
      const data = [...singerList, ...res.data.artists];
      console.log("data.length", data.length);
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    } catch (e) {
      console.log("加载更多热门歌手数据获取失败", e);
    }
  };
};

export const getSingerList = (category: string, alpha: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await getSingerListRequest(category, alpha, 0);
      const data = res.data.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    } catch (e) {
      console.log("歌手数据获取失败");
    }
  };
};

export const refreshMoreSingerList = (category: string, alpha: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { pageCount, singerList } = getState().singers;
      const res = await getSingerListRequest(category, alpha, pageCount);
      const data = [...singerList, ...res.data.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    } catch (e) {
      console.log("加载更多歌手数据获取失败", e);
    }
  };
};
