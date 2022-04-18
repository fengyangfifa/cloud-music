import produce from "immer";
import { Dispatch, Reducer } from "redux";

import { getRankListRequest } from "@/api/request";
import { createAction } from "@/utils";

import { RankList } from "@/types";

// constant
export const CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST";
export type CHANGE_RANK_LIST_TYPE = typeof CHANGE_RANK_LIST;

export const CHANGE_LOADING = "home/rank/CHANGE_LOADING";
export type CHANGE_LOADING_TYPE = typeof CHANGE_LOADING;

// actionCreators
const changeRankList = (data: RankList) => {
  return createAction<CHANGE_RANK_LIST_TYPE, RankList>(CHANGE_RANK_LIST, data);
};

const changeLoading = (data: boolean) => {
  return createAction<CHANGE_LOADING_TYPE, boolean>(CHANGE_LOADING, data);
};

export const getRankList = () => {
  return async (dispatch: Dispatch) => {
    const res = await getRankListRequest();
    dispatch(changeRankList(res.data.list));
    dispatch(changeLoading(false));
  };
};

// reducer

export interface RankState {
  readonly rankList: RankList;
  readonly loading: boolean;
}

const defaultState: RankState = {
  rankList: [],
  loading: true
};

export const reducer: Reducer<RankState> = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case CHANGE_RANK_LIST:
      state.rankList = action.data;
      break;
    case CHANGE_LOADING:
      state.loading = action.data;
      break;
  }
}, defaultState);
