import {Dispatch} from "redux";

import {
  CHANGE_BANNER,
  CHANGE_RECOMMEND_LIST
} from "./constants";

import {
  BannerList,
  RecommendList
} from "@/types";

import {getBannerRequest, getRecommendListRequest} from "@/api/request";


export const changeBannerList = (data: BannerList) => ({
  type: CHANGE_BANNER,
  data
});

export const changeRecommendList = (data: RecommendList) => ({
  type: CHANGE_RECOMMEND_LIST,
  data
});

export const getBannerList = () => {
  return (dispatch: Dispatch) => {
    getBannerRequest().then(data => {
      dispatch(changeBannerList(data.data.banners));
    }).catch(() => {
      console.log("轮播图数据传输错误");
    });
  };
};

export const getRecommendList = () => {
  return (dispatch: Dispatch) => {
    getRecommendListRequest().then(data => {
      dispatch(changeRecommendList(data.data.result));
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  };
};
