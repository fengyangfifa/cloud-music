import { combineReducers } from "redux";
import { reducer as recommendReducer } from "@/application/Recommend/store";
import { reducer as singersReducer } from "@/application/Singers/store";
import { reducer as rankReducer } from "@/application/Rank/store";
import { reducer as albumReducer } from "@/application/Album/store";
import { reducer as singerReducer } from "@/application/Singer/store";

const reducers = combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singer: singerReducer
});

export default reducers;
