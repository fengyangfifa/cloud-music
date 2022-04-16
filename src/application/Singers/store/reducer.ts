import produce from "immer";
import { Reducer } from "redux";

import {
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT,
  CHANGE_ENTER_LOADING,
  CHANGE_PULL_UP_LOADING,
  CHANGE_PULL_DOWN_LOADING
} from "./constants";

import { SingerList } from "@/types";

export interface SingersState {
  readonly singerList: SingerList;
  readonly enterLoading: boolean;
  readonly pullUpLoading: boolean;
  readonly pullDownLoading: boolean;
  readonly pageCount: number;
}

const defaultState: SingersState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
};

const singersReducer: Reducer<SingersState> = produce((state, action) => {
  if (!state) {
    return;
  }
  switch (action.type) {
    case CHANGE_SINGER_LIST:
      state.singerList = action.data;
      break;
    case CHANGE_PAGE_COUNT:
      state.pageCount = action.data;
      break;
    case CHANGE_ENTER_LOADING:
      state.enterLoading = action.data;
      break;
    case CHANGE_PULL_UP_LOADING:
      state.pullUpLoading = action.data;
      break;
    case CHANGE_PULL_DOWN_LOADING:
      state.pullDownLoading = action.data;
      break;
  }
}, defaultState);

export default singersReducer;
