import produce from "immer";
import { Reducer } from "redux";

import {
  CHANGE_BANNER,
  CHANGE_RECOMMEND_LIST,
  CHANGE_ENTER_LOADING
} from "./constants";

import { BannerList, RecommendList } from "@/types";

export interface RecommendState {
  readonly bannerList: BannerList;
  readonly recommendList: RecommendList;
  readonly enterLoading: boolean;
}

const defaultState: RecommendState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
};

const recommendReducer: Reducer<RecommendState> = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case CHANGE_BANNER:
      state.bannerList = action.data;
      break;
    case CHANGE_RECOMMEND_LIST:
      state.recommendList = action.data;
      break;
    case CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
  }
}, defaultState);

export default recommendReducer;
