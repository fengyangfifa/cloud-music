import { Dispatch } from "redux";

import {
  CHANGE_BANNER,
  CHANGE_BANNER_TYPE,
  CHANGE_ENTER_LOADING,
  CHANGE_ENTER_LOADING_TYPE,
  CHANGE_RECOMMEND_LIST,
  CHANGE_RECOMMEND_LIST_TYPE
} from "./constants";

import { BannerList, RecommendList } from "@/types";
import { createAction, CreateActionType } from "@/utils";

import { getBannerRequest, getRecommendListRequest } from "@/api/request";

export const getBannerList = () => {
  return (
    dispatch: Dispatch<CreateActionType<CHANGE_BANNER_TYPE, BannerList>>
  ) => {
    getBannerRequest()
      .then((res) => {
        dispatch(
          createAction<CHANGE_BANNER_TYPE, BannerList>(
            CHANGE_BANNER,
            res.data.banners
          )
        );
      })
      .catch(() => {
        console.log("轮播图数据传输错误");
      });
  };
};

export const getRecommendList = () => {
  return (
    dispatch: Dispatch<
      CreateActionType<
        CHANGE_RECOMMEND_LIST_TYPE | CHANGE_ENTER_LOADING_TYPE,
        RecommendList | boolean
      >
    >
  ) => {
    getRecommendListRequest()
      .then((res) => {
        dispatch(
          createAction<CHANGE_RECOMMEND_LIST_TYPE, RecommendList>(
            CHANGE_RECOMMEND_LIST,
            res.data.result
          )
        );
        dispatch(
          createAction<CHANGE_ENTER_LOADING_TYPE, boolean>(
            CHANGE_ENTER_LOADING,
            false
          )
        );
      })
      .catch(() => {
        console.log("推荐歌单数据传输错误");
      });
  };
};
