import { combineReducers } from "redux";
import { reducer as recommendReducer } from "@/application/Recommend/store";
import { reducer as singersReducer } from "@/application/Singers/store";
import { reducer as rankReducer } from "@/application/Rank/store";

const reducers = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer
});

export default reducers;
