import { Dispatch } from "redux";

import {
  CHANGE_BANNER,
  CHANGE_BANNER_TYPE,
  CHANGE_RECOMMEND_LIST,
  CHANGE_RECOMMEND_LIST_TYPE
} from "./constants";

import { BannerList, RecommendList } from "@/types";
import { CreateActionType, createAction } from "@/utils";

import { getBannerRequest, getRecommendListRequest } from "@/api/request";

export const getBannerList = () => {
  return (
    dispatch: Dispatch<CreateActionType<CHANGE_BANNER_TYPE, BannerList>>
  ) => {
    getBannerRequest()
      .then((data) => {
        dispatch(
          createAction<CHANGE_BANNER_TYPE, BannerList>(
            CHANGE_BANNER,
            data.data.banners
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
      CreateActionType<CHANGE_RECOMMEND_LIST_TYPE, RecommendList>
    >
  ) => {
    getRecommendListRequest()
      .then((data) => {
        dispatch(
          createAction<CHANGE_RECOMMEND_LIST_TYPE, RecommendList>(
            CHANGE_RECOMMEND_LIST,
            data.data.result
          )
        );
      })
      .catch(() => {
        console.log("推荐歌单数据传输错误");
      });
  };
};
